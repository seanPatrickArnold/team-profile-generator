// TODO: Include packages needed for this application
const fs = require('fs');const Employee = require('./lib/Employee.js');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');

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
                            writeToFile('./dist/employeePage.html', generateHTML(employees));
                            copyFile();
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
        <link rel="stylesheet" 
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="team">
            <p>My Team</p>
        </div>
        <div class="employees-container">
            <div class="employees">${Object.values(employees).map(employee =>{
                    if (employee.type === 'Manager') {
                    return `
                <div class="employee card">
                    <h2>
                        <p>${employee.name}</p>
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                            <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                        </svg>${employee.type}</p>
                    </h2>
                    <div class="info-div">
                        <p class="info">ID: ${employee.id}</p>
                        <p class="info">Email: <a href = "mailto:${employee.email}">${employee.email}</a></p>
                        <p class="info">Room: ${employee.room}</p>
                    </div>
                </div>`
                    } else if (employee.type === 'Engineer') {
                    return `
                <div class="employee card"> 
                    <h2>
                        <p>${employee.name}</p>
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                            <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                        </svg>${employee.type}</p>
                    </h2>
                    <div class="info-div">
                        <p class="info">ID: ${employee.id}</p>
                        <p class="info">Email: <a href = "mailto:${employee.email}">${employee.email}</a></p>
                        <p class="info">GitHub Username: <a href="https://github.com/${employee.username}">${employee.username}</a></p>
                    </div>
                </div>`
                } else if (employee.type === 'Intern') {
                    return `
                <div class="employee card">
                    <h2>
                        <p>${employee.name}</p>
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                            <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                        </svg>${employee.type}</p>
                    </h2>
                    <div class="info-div">
                        <p class="info">ID: ${employee.id}</p>
                        <p class="info">Email: <a href = "mailto:${employee.email}">${employee.email}</a></p>
                        <p class="info">School: ${employee.school}</p>
                    </div>
                </div>`
                };
            }).join('')}
            </div>
        </div>
        
        
    </body>
    </html>
    
    `
}

// TODO: Create a function to write README file
const writeToFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
            reject(err);
            // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
            return;
            }
    
            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
            ok: true,
            message: 'File copied!'
            });
        });
        });
    };

function generateEmployeeDiv(employees) {
    return ``
}


runGetInfo();




