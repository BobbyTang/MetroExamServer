var express = require('express');
var router = express.Router();
var DBUtils = require('../lib/utils/mySqlUtils');
var dbutils = new DBUtils();
var logger = require('../lib/utils/log4js_wrapper')('index.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/validate', function(req, res) {
  var nationalid = req.param('nationalid', '310115198701014321');

  logger.info('request nationalid = ' + nationalid);
  var params = [];
  params.push(nationalid);

  dbutils.executeQuery('select * from employee_tbl where nationalid = ?', params, function(err, result){
    //query from DB
    if (row = result[0]) {
      res.json({
        employeename: row.employeename,
        employeeid: row.employeeid,
        groupid: row.groupid,
        lineid: row.lineid,
      })
    }
  });

});

router.post('/signin', function(req, res) {
  var national_id = req.param('national_id', '310115198701014321');

  if(!req.session.loginFlag){
    logger.info('create session.national_id:' + national_id)
    req.session.loginFlag = true;
    req.session.national_id = national_id;
  }

  logger.info('Print session.national_id:' + national_id);


  res.send(200);
});

router.post('/signout', function(req, res) {
  logger.info('signout');
});

router.post('/submitResult', function(req, res) {
  logger.info('submitResult');
});

module.exports = router;
