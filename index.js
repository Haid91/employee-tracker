const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Haideee.1991",
    database: "work_db"
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
                console.log ("employees")
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
    console.log ("view employees")
    await queryDatabase("SELECT * FROM employee");
    askQuestions();
};

const viewDepartments = async () => {
    await queryDatabase("SELECT * FROM department");
    askQuestions();
};

const addDepartment = async () => {
    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the new department?'
        }
    ]);

    await queryDatabase('INSERT INTO department SET ?', {
        name: res.departmentName
    });

    askQuestions();
};

const addRole = async () => {
    const res = await inquirer.prompt([
       {
            type: 'input',
            name: 'roleName',
            message: 'What is the title of the role?'

       },
       {
            type: 'input',
            name: 'salarytype',
            message: 'What is the salary of the role?'
       },
       {
            type: 'input',
            name: 'departmenttype',
            message: 'What is the deprtment id?'
       } 

       
       
    ])

    await queryDatabase('INSERT INTO role SET ?', {
        title: res.roleName,
        salary: res.salarytype,
        department_id: res.departmenttype

    });

    askQuestions();
}

const addEmployee = async () => {
    const res = await inquirer.prompt([
        // Employee prompts
        {
            type: 'input',
            name: 'firstName',
            message: 'what is the employee first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'what is the employee last name?' 
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'what is the employee role id?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'what is the manager id?'
        }
    ]);

    
    
    // Update the askQuestions function
    //const askQuestions = async () => {
        // ... existing code ...
    
       // switch (answers.choice) {
            // ... other cases ...
    
          //  case "add department":
           //     await addDepartment();
            //    break;
    
            // ... other cases ...
      //  }
   // };

    

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
