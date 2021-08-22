const Employee = require('./lib/Employee.js');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const inquirer = require('inquirer');

const employees = {};

function runGetInfo() {

    let employeeType;
    let newEmployee;

    let questions = [
            
        
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name? (Required)",
            default: 'John Jameson',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is this employee's id?",
            name: 'id',
            default: Math.floor(Math.random()*1000),
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter id!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: 'What is the email the of employee?',
            name: 'email',
            default: 'john@john.com',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        }
    ]


    inquirer
        .prompt(
            {
                type: 'list',
                message: 'What type of employee would you like to add?',
                name: 'type',
                choices: ['Manager', 'Engineer', 'Intern'],
                default: ['Manager'],
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('Please enter your title!');
                        return false;
                    }
                }
            })
            .then(answer => {
                employeeType = answer.type;
                if (answer.type === 'Manager') {
                    questions.push(
                        {
                            type: 'input',
                            message: "What is this manager's room number?",
                            name: 'room',
                            default: Math.floor(Math.random()*1000),
                            validate: roomInput => {
                                if (roomInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a room number!');
                                    return false;
                                }
                            }
                        }
                    )
                } else if (answer.type === 'Engineer') {
                    questions.push(
                        {
                            type: 'input',
                            message: "What is this engineer's GitHub username?",
                            name: 'username',
                            default: Math.floor(Math.random()*1000),
                            validate: usernameInput => {
                                if (usernameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a username!');
                                    return false;
                                }
                            }
                        }
                    )
                } else if (answer.type === 'Intern') {
                    questions.push(
                        {
                            type: 'input',
                            message: "What is this intern's school?",
                            name: 'school',
                            default: Math.floor(Math.random()*1000),
                            validate: schoolInput => {
                                if (schoolInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a school!');
                                    return false;
                                }
                            }
                        }
                    )
                }
                return(questions)
            })
            .then(questions => runFurtherQuestions(questions, employeeType));
}

function runFurtherQuestions(questions, employeeType) {
    inquirer
        .prompt(questions)
        .then(answers => {
            answers.type = employeeType
            newEmployee = answers;
            return(answers)
        })
        .then(answers => {
            inquirer
                .prompt(
                    {
                        type: 'list',
                        message: 'Would you like to add another employee?',
                        name: 'continue',
                        choices: ['Yes', 'No'],
                        default: ['Yes'],
                        validate: continueInput => {
                            if (continueInput) {
                                return true;
                            } else {
                                console.log('Please decide!');
                                return false;
                            }
                        }
                    })
                    .then(addNewAnswer => {
                        if (answers.type === 'Manager') {
                            employees[answers.id] = new Manager(answers);
                        } else if (answers.type === 'Engineer') {
                            employees[answers.id] = new Engineer(answers);
                        } else if (answers.type === 'Intern') {
                            employees[answers.id] = new Intern(answers);
                        }

                        if (addNewAnswer.continue === 'Yes') {
                            runGetInfo();
                        }
                        else {
                            console.log(employees);
                        }
                    })
        })
}

function generateHTML(employees) {

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div>
            ${Object.values(employees).forEach(employee =>{
                return
            })}
        </div>
        
    </body>
    </html>
    
    `
}

function generateEmployeeDiv(employees) {
    return ``
}


runGetInfo();




