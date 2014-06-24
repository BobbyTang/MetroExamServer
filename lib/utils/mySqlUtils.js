var mysql = require('mysql');

module.exports = DBUtils;

var DBUtils = function() {
  this.client = mysql.createClient({ host: 'localhost', user: 'root', password: ''});
};

/**
	* select operation
	*/
DBUtils.prototype.executeQuery = function(sql){
	this.client.query(sql,data);
}

/**
	* update/delete operation
	*/
DBUtils.prototype.executeUpdOrDel = function(sql){
	this.client.query(sql,data, function(err, info) {
		if (err) {
			return handle_error(err);
		}
		console.log(info.insertId);
	);
}

/**
	* insert operation
	*/
DBUtils.prototype.executeInsert = function(sql){
	this.client.query(sql, data, function(err, info) {
		if (err) {
			return handle_error(err);
		}
		console.log(info.affectedRows);
	);
}









