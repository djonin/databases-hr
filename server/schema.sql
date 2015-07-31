CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
username VARCHAR(100),
textMsg VARCHAR(140),
roomname VARCHAR(100),
createdAt DATE,
id int(11) NOT NULL auto_increment,
PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

