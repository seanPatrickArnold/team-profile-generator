const inquirer = require('inquirer');

class Employee {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.email = data.email;
        this.type = data.type;

    }

    getName = function () {
        console.log(this.name);
    }

    getId = function () {
        console.log(this.id);
    }

    getEmail = function () {
        console.log(this.email);
    }

    getRole = function () {
        console.log(this.type);
    } // Returns 'Employee'
}

module.exports = Employee;



