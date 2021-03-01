//properties and methods inherited from Employee class:
// name
// id
// email
// getName()
// getId()
// getEmail()
// getRole returns 'Employee'

const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber();
    getRole(); //return 'Manager'
}


module.exports = Manager;