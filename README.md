MetroExamServer
=========
##MySQL
``
/usr/local/Cellar/mysql/5.6.10/bin/mysqld
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server start
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server stop
mysql -h localhost --auto-rehash -p -u root

``

``
CREATE DATABASE metroexam_db;
USE metroexam_db;
``

``
create table employee_tbl(
  nationalid varchar(20) primary key,
	employeeid varchar(20),
	groupid varchar(20),
	lineid varchar(20),
	additonal_desc varchar(30),
	flag char(1)
);
``
##Express Node Server
