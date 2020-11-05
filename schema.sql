-- Drops the management_db if it exists currently --
DROP DATABASE IF EXISTS management_db;
-- Creates the "management_db" database --
CREATE DATABASE management_db;

-- Makes it so all of the following code will affect management_db --
USE management_db;

-- Creates the table "department" within management_db --
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  PRIMARY KEY(id)
);

-- Creates the table "role" within management_db --
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

-- Creates the table "role" within management_db --
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id)
);


INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Accounting"), ("Production"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 95000, 1), ("Sales Associate", 65000, 1), 
		("Engineering Manager", 105000, 2), ("Software Engineer", 75000, 2), ("Mechanical Engineer", 65000, 2),
        ("Financial Controller", 95000, 3),
        ("Accounts Payable Rep", 55000, 4), ("Account Receivable Rep", 55000, 4),
        ("Production Manager", 75000, 5), ("Production Supervisor", 55000, 5), ("Production Technician", 35000, 5),
        ("Lawyer", 120000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
		("Mike", "Chan", 2), ("Bob", "Dole", 2),
        ("Ashely", "Bonkers", 3),
        ("Kevin", "Crazy Man", 4),
        ("Tupik", "Sarnick", 5),
        ("Mary", "Larry", 6),
        ("Mike", "Bike", 7), 
        ("Walter", "Saxphone", 8),
        ("Tom", "Allen", 9),
        ("Mike", "Brown", 10),
        ("Kevin", "Bacon", 11), ("Marry", "Poppins", 11),
        ("Liar", "Liar", 12);

-- To join all the tables
SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name 
	FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;

-- To display employees by department        
SELECT employee.first_name, employee.last_name, department.department_name, employee.manager_id
	FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;    
        
     
SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;      

-- To display employees by manager.
SELECT employee.first_name, employee.last_name, managers.manager_first_name, managers.manager_last_name
 FROM employee LEFT JOIN managers ON employee.manager_id = managers.manager_id; 

SELECT * FROM employee LEFT JOIN employee managed ON employee.manager_id = managed.id;    

-- To display employees from a certain department
SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name 
	FROM employee LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id WHERE department.department_name = "Production";