const Employee = require('./Employee');

class Manager extends Employee {
    constructor(data) {
        super(data);
        this.room = data.room;
    }

    getUsername() {
        console.log(this.room);
    }
}

module.exports = Manager;