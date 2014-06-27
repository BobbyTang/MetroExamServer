var express = require('express');
var router = express.Router();
var DBUtils = require('../lib/utils/mySqlUtils');
var dbutils = new DBUtils();
var logger = require('../lib/utils/log4js_wrapper')('index.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', function(req, res) {
  var nationalid = req.param('nationalid', '310115198701014321');

  logger.info('request nationalid = ' + nationalid);
  var params = [];
  params.push(nationalid);

  dbutils.executeQuery("select * from employee_tbl where nationalid = ? and flag = 'Y'", params, function(err, result) {
    //query from DB
    if (row = result[0]) {
      if(req.session.loginFlag === undefined){
        logger.info('create session.nationalid:' + nationalid)
        req.session.loginFlag = true;
        req.session.nationalid = nationalid;
        req.session.employeename = row.employeename;
        req.session.employeeid = row.employeeid;
        req.session.groupid = row.groupid;
        req.session.lineid = row.lineid;
      }
      logger.info('Attempt to return employee[nationalid=' + nationalid  + '] json info data.');
      res.json({
        employeename: row.employeename,
        employeeid: row.employeeid,
        groupid: row.groupid,
        lineid: row.lineid,
      });
    }else {
      logger.warn('Can not find nationalid = ' + nationalid);
      res.json({error:'true'});
    }
  });

});

router.post('/signout', function(req, res) {
  logger.info('Try to signout, nationalid = ' + req.session.nationalid);
  req.session.destroy(function(err) {
    if (err)
      logger.error(err);
      res.json({error:'true'});
  })
  logger.info('Signout successfully.')
  res.json({});
});

router.post('/submitResult', function(req, res) {
  var score = req.param('score');
  var nationalid = req.session.nationalid;
  var params = [];
  params.push(nationalid);
  params.push(score);
  params.push(null);
  if(score) {
    dbutils.executeInsert('insert into exam_score_record_tbl(nationalid,score,elapsed_ts) values(?,?,?)', params);
  }
  logger.info('Attempt to return submit info.');
  res.json({submitStatus: 'success'});
});

module.exports = router;
