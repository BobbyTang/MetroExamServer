var mysql = require('mysql');
var logger = require('./log4js_wrapper')('DBUtils-mySqlUtils.js');

var DBUtils = function() {
  this.connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'metroexam_db'});
};

module.exports = DBUtils;

/**
  * select operation
  */
DBUtils.prototype.executeQuery = function(sql, params, handler){
  if (params === undefined) params = [];
  var query = this.connection.query(sql, params, handler);
  logger.info("exec sql:" + query.sql);
  return query;
}

/**
 *update/delete operation
 */
DBUtils.prototype.executeUpdOrDel = function(sql){
  if (params === undefined) params = [];
  this.connection.query(sql,data, function(err, info) {
    if (err) {
      return handle_error(err);
    }
  //logger.info(info.insertId);
  });
}

/**
  * insert operation
  */
DBUtils.prototype.executeInsert = function(sql){
  if (params === undefined) params = [];
  this.connection.query(sql, data, function(err, info) {
    if (err) {
      return handle_error(err);
    }
    logger.info(info.affectedRows);
  });
}

var handle_error = function(err){
  logger.info(err);
  return false;
}
