-- Drops the management_db if it exists currently --
DROP DATABASE IF EXISTS management_db;
-- Creates the "management_db" database --
CREATE DATABASE management_db;

-- Makes it so all of the following code will affect management_db --
USE management_db;

-- Creates the table "department" within management_db --
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

-- Creates the table "role" within management_db --
CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

-- Creates the table "role" within management_db --
CREATE TABLE employee (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);


INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Accounting"), ("Production"), ("Legal");