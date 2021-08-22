const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(data) {
        super(data);
        this.username = data.username;
    }

    getUsername() {
        console.log(this.username);
    }
}

module.exports = Engineer;