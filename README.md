MetroExamServer
=========
##MySQL
```
/usr/local/Cellar/mysql/5.6.10/bin/mysqld
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server start
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server stop
mysql -h localhost --auto-rehash -p -u root

```

```
CREATE DATABASE metroexam_db;
USE metroexam_db;
```

```
create table employee_tbl(
  nationalid varchar(20) primary key,
	employeeid varchar(20),
	employeename varchar(20),
	groupid varchar(20),
	lineid varchar(20),
	additonal_desc varchar(30),
	flag char(1)
);

insert into employee_tbl values('310115198701014321','56789','zhangjy','4001','line 4','add_desc','Y');

create table exam_score_record_tbl(
  id int primary key auto_increment,
	nationalid varchar(20) not null,
	score float,
	elapsed_ts timestamp,
	attended_ts timestamp default current_timestamp
);

select b.employeename, b.groupid, a.score, a.attended_ts from exam_score_record_tbl a, employee_tbl b where a.nationalid = b.nationalid order by a.score asc;

```
##Express Node Server
static html: MetroExamServer/public/examination.html

static js: public/js/exam_func.js

```
node bin/www

http://localhost:3000/examination.html

curl --data "nationalid=1111" http://localhost:3000/signin
```