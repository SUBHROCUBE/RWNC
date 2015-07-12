drop database IF EXISTS rwncv1;
create database IF NOT EXISTS rwncv1;
use rwncv1;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
	user_id	int(20) auto_increment,
	user_name varchar(100) NOT NULL,
	user_pwd varchar(100) NOT NULL DEFAULT '12345',
	PRIMARY KEY(user_id)
);
insert into user (user_name,user_pwd) values('admin','admin');
insert into user (user_name,user_pwd) values('manager','manager');
insert into user (user_name,user_pwd) values('prodlead','prodlead');

DROP TABLE IF EXISTS access;
CREATE TABLE access (
	access_id int(20) auto_increment,
	access_name	varchar(100) NOT NULL,
	PRIMARY KEY(access_id)
);

insert into access (access_name) values('stock_view');
insert into access (access_name) values('stock_edit');
insert into access (access_name) values('customer_add');
insert into access (access_name) values('customer_view');
insert into access (access_name) values('customer_edit');
insert into access (access_name) values('home_view');

DROP TABLE IF EXISTS permission;
CREATE TABLE permission (
	user_id	int(20) NOT NULL,
	access_id int(20) NOT NULL,
	PRIMARY KEY(user_id,access_id),
	FOREIGN KEY (user_id) REFERENCES user (user_id),
	FOREIGN KEY (access_id) REFERENCES access (access_id)
);

insert into permission (user_id,access_id) values(1,1);
insert into permission (user_id,access_id) values(1,2);
insert into permission (user_id,access_id) values(1,3);
insert into permission (user_id,access_id) values(1,4);
insert into permission (user_id,access_id) values(1,5);
insert into permission (user_id,access_id) values(1,6);
insert into permission (user_id,access_id) values(2,3);
insert into permission (user_id,access_id) values(2,4);

DROP TABLE IF EXISTS type;
CREATE TABLE type (
	type_id	int(20) auto_increment,
	type_name varchar(100) NOT NULL,
	status varchar(25) NOT NULL,
	PRIMARY KEY(type_id),
	CONSTRAINT chk_status CHECK (status IN ('active','inactive'))	
); 

insert into type (type_name,status) values('chain-link','active');
insert into type (type_name,status) values('mesh','active');
insert into type (type_name,status) values('conveyor','active');
insert into type (type_name,status) values('clamp-plate','active');
insert into type (type_name,status) values('wire','active');

DROP TABLE IF EXISTS material;
CREATE TABLE material (
	material_id	int(20) auto_increment,
	material_name varchar(100) NOT NULL,
	status varchar(25) NOT NULL,
	PRIMARY KEY(material_id),
	CONSTRAINT chk_status CHECK (status IN ('active','inactive'))
);

insert into material (material_name,status) values('ss 304','active');
insert into material (material_name,status) values('ss 316','active');
insert into material (material_name,status) values('as','active');
insert into material (material_name,status) values('ms','active');

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
	customer_id	int(20) auto_increment,
	alias	varchar(100) ,
	name	varchar(100) NOT NULL,
	spoc	varchar(100) NOT NULL,
	contact1	varchar(100) NOT NULL,
	contact2	varchar(100) ,
	address	varchar(100) ,
	email1	varchar(100) ,
	email2	varchar(100) ,
	vat_no	varchar(100) ,
	cst_no	varchar(100) ,
	status	varchar(100) ,
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP,
	ub	int(20) ,
	PRIMARY KEY(customer_id)
);

insert into customer (alias,name,spoc,contact1,email1,vat_no,cst_no,status,cb) values('Banaraswala','G.K.Tiwari','Hemant','9999999999','xxxxx@gmail.com','VAT001','CST001','active',1);
insert into customer (alias,name,spoc,contact1,email1,vat_no,cst_no,status,cb) values('Badabazar','A.P.Jhunjhunwala','Kailash','9999999999','xxxxx@gmail.com','VAT002','CST002','active',1);
insert into customer (alias,name,spoc,contact1,email1,vat_no,cst_no,status,cb) values('Tea Garden','Maity International','Vijay','9999999999','xxxxx@gmail.com','VAT003','CST003','active',1);
insert into customer (alias,name,spoc,contact1,email1,vat_no,cst_no,status,cb) values('University','NIIT','Hemant','9999999999','xxxxx@gmail.com','VAT004','CST004','active',1);

DROP TABLE IF EXISTS item;
CREATE TABLE item (
	item_id	int(20) auto_increment,
	opening	NUMERIC(20,2),
	diameter	NUMERIC(20,2),
	length	NUMERIC(20,2),
	width	NUMERIC(20,2),
	type	varchar(100),
	material	varchar(100),
	raw_ready	varchar(100),
	description	varchar(1000),
	is_clamp	BOOLEAN DEFAULT FALSE,
	c_pos	varchar(100),
	c_length	NUMERIC(20,2),
	c_thickness	NUMERIC(20,2),
	c_desc	varchar(1000),
	threshold NUMERIC(20,2),
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP,
	ub	int(20) ,
	PRIMARY KEY(item_id)
);

insert into item (opening,diameter,length,width,type,material,raw_ready,description,threshold,cb) values(20.00,4.00,5000.00,400.00,'chain-link','ss 304','ready','This is a sample',10000.00,1);
insert into item (opening,diameter,length,width,type,material,raw_ready,description,threshold,cb) values(22.00,6.00,7000.00,400.00,'mesh','ss 316','ready','This is a sample',10000.00,1);
insert into item (opening,diameter,length,width,type,material,raw_ready,description,threshold,cb) values(25.00,8.00,8000.00,400.00,'conveyor','ms','ready','This is a sample',10000.00,1);
insert into item (length,width,type,material,raw_ready,description,threshold,cb) values(6000.00,40.00,'clamp-plate','as','raw','This is a sample',10000.00,1);

insert into item (diameter,type,material,raw_ready,description,threshold,cb) values(10.00,'wire','ss 316','raw','This is a sample',100000.00,1);

DROP TABLE IF EXISTS stock;
CREATE TABLE stock (
	stock_id	int(20) auto_increment,
	item_id	int(20),
	quantity	int(20),
	weight	NUMERIC(20,2),
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(stock_id),
	FOREIGN KEY (item_id) REFERENCES item (item_id)
);

insert into stock (item_id,weight,cb) values(1,1000.00,1);
insert into stock (item_id,weight,cb) values(2,500.00,1);
insert into stock (item_id,weight,cb) values(3,300.00,1);
insert into stock (item_id,weight,cb) values(4,600.00,1);
insert into stock (item_id,weight,cb) values(5,800.00,1);

DROP TABLE IF EXISTS received;
CREATE TABLE received (
	received_id	int(20) auto_increment,
	customer_id	int(20),
	item_id	int(20),
	quantity	int(20),
	weight	NUMERIC(20,2),
	received_date DATETIME,
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(received_id),
	FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
	FOREIGN KEY (item_id) REFERENCES item (item_id)
);

insert into received (customer_id,item_id,weight,received_date,cb) values(1,1,1000.00,'2015-06-14 00:00:00',1);
insert into received (customer_id,item_id,weight,received_date,cb) values(1,2,500.00,'2015-06-15 00:00:00',1);
insert into received (customer_id,item_id,weight,received_date,cb) values(2,3,300.00,'2015-06-16 00:00:00',1);
insert into received (customer_id,item_id,weight,received_date,cb) values(2,4,600.00,'2015-06-10 00:00:00',1);
insert into received (customer_id,item_id,weight,received_date,cb) values(1,5,800.00,'2015-06-12 00:00:00',1);

DROP TABLE IF EXISTS deposit;
CREATE TABLE deposit (
	deposit_id	int(20) auto_increment,
	customer_id	int(20),
	item_id	int(20),
	quantity	int(20),
	weight	NUMERIC(20,2),
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(deposit_id),
	FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
	FOREIGN KEY (item_id) REFERENCES item (item_id)
);

insert into deposit (customer_id,item_id,weight,cb) values(1,1,1000.00,1);
insert into deposit (customer_id,item_id,weight,cb) values(1,2,500.00,1);
insert into deposit (customer_id,item_id,weight,cb) values(2,3,300.00,1);
insert into deposit (customer_id,item_id,weight,cb) values(2,4,600.00,1);
insert into deposit (customer_id,item_id,weight,cb) values(1,5,800.00,1);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
	order_id	int(20) auto_increment,
	parent_order_id int(20) NOT NULL,
	customer_id	int(20),
	item_id	int(20),
	quantity	int(20),
	quantity_completed	int(20) DEFAULT 0,
	quantity_in_production	int(20) DEFAULT 0,
	weight	NUMERIC(20,2),
	rate	NUMERIC(20,2),
	order_date	DATETIME,
	delivery_date	DATETIME,
	stock_provided	BOOLEAN DEFAULT FALSE,
	status varchar(25) NOT NULL,
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(order_id),
	FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
	FOREIGN KEY (item_id) REFERENCES item (item_id)
);

insert into orders (parent_order_id,customer_id,item_id,quantity,rate,stock_provided,order_date,delivery_date,status,cb) values(1,1,1,4,1780.00,TRUE,'2015-06-12 00:00:00','2015-07-12 00:00:00','DELIVERED',1);
insert into orders (parent_order_id,customer_id,item_id,quantity,rate,stock_provided,order_date,delivery_date,status,cb) values(2,2,1,8,2780.00,TRUE,'2015-06-12 00:00:00','2015-07-12 00:00:00','IN PRODUCTION',1);
insert into orders (parent_order_id,customer_id,item_id,quantity,rate,stock_provided,order_date,delivery_date,status,cb) values(3,2,3,10,1680.00,FALSE,'2015-06-12 00:00:00','2015-07-12 00:00:00','IN PRODUCTION',1);
insert into orders (parent_order_id,customer_id,item_id,quantity,rate,stock_provided,order_date,delivery_date,status,cb) values(4,4,3,4,1750.00,FALSE,'2015-06-12 00:00:00','2015-07-12 00:00:00','ON HOLD',1);

DROP TABLE IF EXISTS delivery;
CREATE TABLE delivery (
	delivery_id	int(20) auto_increment,
	order_id	int(20),
	delivery_date	DATETIME,
	delivered_by	varchar(100) NOT NULL,
	vehicle_no	varchar(100),
	bill_no	varchar(100),
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(delivery_id),
	FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

insert into delivery (order_id,delivery_date,delivered_by,vehicle_no,bill_no,cb) values(1,'2015-06-12 00:00:00','EMP001','VEHIC001','BILL001',1);

DROP TABLE IF EXISTS production;
CREATE TABLE production (
	production_id	int(20) auto_increment,
	order_id	int(20),
	expected_end_date	DATETIME,
	start_date	DATETIME,
	end_date	DATETIME,
	pm	varchar(100),
	dice varchar(100),
	machine	varchar(100),
	status	varchar(100),
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(production_id),
	FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

insert into production (order_id,expected_end_date,start_date,end_date,pm,dice,machine,status,cb) values(1,'2015-06-10 00:00:00','2015-06-01 00:00:00','2015-06-09 00:00:00','EMP004','DICE001','MACHINE003','COMPLETED',1);
insert into production (order_id,expected_end_date,start_date,pm,dice,machine,status,cb) values(2,'2015-06-27 00:00:00','2015-06-12 00:00:00','EMP004','DICE007','MACHINE003','STARTED',1);
insert into production (order_id,expected_end_date,start_date,pm,dice,machine,status,cb) values(3,'2015-07-01 00:00:00','2015-06-14 00:00:00','EMP004','DICE009','MACHINE004','STARTED',1);

DROP TABLE IF EXISTS production_item_used;
CREATE TABLE production_item_used (
	production_item_used_id	int(20) auto_increment,
	production_id	int(20),
	item_id	int(20),
	quantity	int(20) DEFAULT 0,
	weight	NUMERIC(20,2) DEFAULT 0,
	co	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	cb	int(20) ,
	uo	TIMESTAMP ,
	ub	int(20) ,
	PRIMARY KEY(production_item_used_id),
	FOREIGN KEY (production_id) REFERENCES production (production_id),
	FOREIGN KEY (item_id) REFERENCES item (item_id)
);


insert into production_item_used (production_id,item_id,quantity,cb) values(1,1,150,1);
insert into production_item_used (production_id,item_id,quantity,cb) values(2,1,100,1);
insert into production_item_used (production_id,item_id,quantity,cb) values(2,2,80,1);
insert into production_item_used (production_id,item_id,quantity,cb) values(3,3,800,1);


DROP TABLE IF EXISTS login;
CREATE TABLE login (
	login_id	int(20) auto_increment,
	user_id	int(20),
	login_time	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(login_id),
	FOREIGN KEY (user_id) REFERENCES user (user_id)
);

insert into login (user_id) values(1);
insert into login (user_id) values(1);
insert into login (user_id) values(1);
insert into login (user_id) values(2);
insert into login (user_id) values(3);
insert into login (user_id) values(1);
insert into login (user_id) values(2);
insert into login (user_id) values(1);
insert into login (user_id) values(1);
