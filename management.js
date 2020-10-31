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
    password: "$n@k3t0wn!$myH0m",
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
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Roles",
                    "Add Role",
                    "Remove Role"
                ]
            },
        ])
        .then(function (answers) {
            userChoice = (answers.userChoice[0]);

            console.log(userChoice)

            if (userChoice === "View All Employees") {
                displayEmployeeTable();
            }

        })
};

getUserChoice();


// Function to display the Employee Table from the management_db database
function displayEmployeeTable() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};
