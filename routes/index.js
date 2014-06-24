var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/validate', function(req, res) {
  var nationalid = req.param('nationalid', '310115198701014321');
  
  console.log('nationalid = ' + nationalid);
  
	
	
  //query from DB
  var username = 'zhangjunyi';
  var employeeid = '12345';
  var groupid = '001';
  var lineid = 'line 4';
  res.json({'username': username, 'workid': workid, 'groupid':groupid, 'lineid':lineid});
});

router.post('/signin', function(req, res) {
  var national_id = req.param('national_id', '310115198701014321');
  
  if(!req.session.loginFlag){
    console.log('create session.national_id:' + national_id)
    req.session.loginFlag = true;
	req.session.national_id = national_id;
  }
  
  console.log('Print session.national_id:' + national_id);
  
  
  res.send(200);
});

router.post('/signout', function(req, res) {
  console.log('signout');
});

router.post('/submitResult', function(req, res) {
	console.log('submitResult');
});

module.exports = router;
