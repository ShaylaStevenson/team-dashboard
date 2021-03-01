//properties and methods inherited from Employee class:
// name
// id
// email
// getName()
// getId()
// getEmail()
// getRole returns 'Employee'

const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool();
    getRole(); //return 'Intern'
}

module.exports = Intern;