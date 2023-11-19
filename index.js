const mysql = require('mysql');
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "takecare1",
    database: "workdb"
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log(`Connected as id ${connection.threadId}\n`);
    askQuestions();
});

const askQuestions = async () => {
    try {
        const answers = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            choices: [
                "view all employees",
                "view all departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "QUIT"
            ],
            name: "choice"
        });

        switch (answers.choice) {
            case "view all employees":
                await viewEmployees();
                break;
            case "view all departments":
                await viewDepartments();
                break;
            case "add employee":
                await addEmployee();
                break;
            case "add department":
                await addDepartment();
                break;
            case "add role":
                await addRole();
                break;
            case "update employee role":
                await updateEmployeeRole();
                break;
            default:
                connection.end();
                break;
        }
    } catch (err) {
        console.error('Error: ', err);
    }
};

const queryDatabase = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.table(data);
                resolve(data);
            }
        });
    });
};

const viewEmployees = async () => {
    await queryDatabase("SELECT * FROM employee");
    askQuestions();
};

const viewDepartments = async () => {
    await queryDatabase("SELECT * FROM department");
    askQuestions();
};

const addEmployee = async () => {
    const res = await inquirer.prompt([
        // Employee prompts
    ]);
    await queryDatabase('INSERT INTO employee SET ?', {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId,
        manager_id: res.managerId
    });
    askQuestions();
};

// Similar functions for addDepartment, addRole, updateEmployeeRole
// ...
