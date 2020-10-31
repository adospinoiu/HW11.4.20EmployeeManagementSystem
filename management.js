// Dependencies Required
const inquirer = require("inquirer");
const mysql = require("mysql");


//User is prompted for what to do
let userChoice = " ";
function getUserChoice() {
    inquirer
        .prompt([
            {
                type: "checkbox",
                message: "What woud you like to do?",
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
        })
};

getUserChoice();