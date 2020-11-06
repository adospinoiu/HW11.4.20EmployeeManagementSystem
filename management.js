// Dependencies Required
const inquirer = require("inquirer");
const mysql = require("mysql");


// Information to connect to the MySQL database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "management_db"
});


// Establishes connection to database. Throws error if there is an issue
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


//User is prompted for what to do
let userChoice = " ";
function getUserChoice() {
    inquirer
        .prompt([
            {
                type: "checkbox",
                message: "What would you like to do?",
                name: "userChoice",
                loop: false,
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Manager",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Roles",
                    "Remove Role"
                ]
            },
        ])
        .then(function (answers) {
            userChoice = (answers.userChoice[0]);

            console.log(userChoice + "\n")

            // Evaluates the users input and makes the correct choice on which function to call
            if (userChoice === "View All Employees") {
                displayAllEmployeeInformation();
            } else if (userChoice === "View All Employees by Department") {
                displayEmployeesByDepartment();
            } else if (userChoice === "View All Employees by Manager") {
                displayEmployeesByManager();
            } else if (userChoice === "Add Employee") {
                addEmployeeToDatabase();
            } else if (userChoice === "Add Department") {
                addDepartment();
            } else if (userChoice === "Add Role") {
                addRole();
            }

        })
};

getUserChoice();


// Function to display the all employee information on one table from the management_db database
function displayAllEmployeeInformation() {
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id', function (err, res) {
        if (err) throw err;
        console.table(res);


        console.log("\n");

        getUserChoice();
    });
};


// Function to display all employees by department on one table from the management_db database
function displayEmployeesByDepartment() {
    connection.query('SELECT employee.first_name, employee.last_name, department.department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id', function (err, res) {
        if (err) throw err;
        console.table(res);


        console.log("\n");
        getUserChoice();
    });
};


// Function to display all employees by manager on one table from the management_db database
function displayEmployeesByManager() {
    connection.query('SELECT employee.first_name, employee.last_name, managers.manager_first_name, managers.manager_last_name FROM employee LEFT JOIN managers ON employee.manager_id = managers.manager_id', function (err, res) {
        if (err) throw err;
        console.table(res);


        console.log("\n");

        getUserChoice();
    });
};


// Function to add an employee to the management_db database
let firstName = " ";
let lastName = " ";
let employeeRole = " ";
let employeeSalary = " ";
function addEmployeeToDatabase() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the Employee's First Name: ",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter the Employee's Last Name: ",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the Employee's Role: ",
                name: "employeeRole",
                loop: false,
                choices: [
                    "1  Sales Manager",
                    "2  Sales Associate",
                    "3  Engineering Manager",
                    "4  Software Engineer",
                    "5  Mechanical Engineer",
                    "6  Financial Controler",
                    "7  Accounts Payable Rep",
                    "8  Accounts Receivable Rep",
                    "9  Production Manager",
                    "10 Production Supervisor",
                    "11 Production Technician",
                    "12 Lawyer"
                ]
            },
            {
                type: "input",
                message: "Enter the Employee's Salary: ",
                name: "employeeSalary"
            },
        ])
        .then(function (answers) {
            firstName = answers.firstName;
            lastName = answers.lastName;
            employeeRole = answers.employeeRole;
            employeeSalary = answers.employeeSalary;

            let employeeRoleId = employeeRole.substring(0,2);

            console.log(firstName);
            console.log(lastName);
            console.log(employeeRole);
            console.log(employeeRoleId);
            console.log(employeeSalary);

            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [answers.firstName, answers.lastName, employeeRoleId], function (err, res) {
                if (err) throw err;
                console.table(res);
            });

            getUserChoice();
        })
};


// Function to add a department to the management_db database
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the Department to add to the database",
            name: "departmentName"
        }
    ])
    .then(function (answers) {
        connection.query("INSERT INTO department (department_name) VALUES (?)", [answers.departmentName], function (err, res) {
            if (err) throw err;
            console.table(res);

            getUserChoice();
        });
    })
};


// function to add a role to the management_db database
let roleName = " ";
let roleSalary = " ";
let roleDepartment = " ";
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the Role to add to the database",
            name: "roleName"
        },
        {
            type: "input",
            message: "Enter the Salary of the Role",
            name: "roleSalary"
        },
        {
            type: "list",
            message: "Enter the Department the Role is in: ",
            name: "roleDepartment",
            loop: false,
            choices: [
                "1  Sales",
                "2  Engineering",
                "3  Finance",
                "4  Accounting",
                "5  Production",
                "6  Legal"
            ]
        },
    ])
    .then(function (answers) {
        roleName = answers.roleName;
        roleSalary = answers.roleSalary;
        roleDepartment = answers.roleDepartment;

        let roleDepartmentId = roleDepartment.substring(0,1);

        console.log(roleName);
        console.log(roleSalary);
        console.log(roleDepartment);
        console.log(roleDepartmentId);
        
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, roleDepartmentId], function (err, res) {
            if (err) throw err;
            console.table(res);

            getUserChoice();
        });
    })
};
