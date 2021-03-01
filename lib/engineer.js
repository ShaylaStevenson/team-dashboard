//properties and methods inherited from Employee class:
// name
// id
// email
// getName()
// getId()
// getEmail()
// getRole returns 'Employee'

const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub();
    getRole(); //return 'Engineer'
}





module.exports = Engineer;