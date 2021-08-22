const Employee = require('./Employee');

class Intern extends Employee {
    constructor(data) {
        super(data);
        this.school = data.school;
    }

    getUsername() {
        console.log(this.school);
    }
}

module.exports = Intern;