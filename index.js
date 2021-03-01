const inquirer = require('inquirer');
const fs = require('fs');

// const Employee = require('./lib/employee');
// const Intern = require('./lib/intern');
// const Engineer = require('./lib/engineer');
// const Manager = require('./lib/manager');

const questions = () =>
    inquirer.prompt([
        // prompts for all entries (Employee)
        {
            type: 'checkbox',
            name: 'role',
            message: 'In which role is the employee?',
            choices: ['Intern', 'Engineer', 'Manager', 'Employee (default)'],
            default: 'Employee (default)'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their ID number?',
            default: 'non-applicable'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is their email?',
            default: 'non-applicable'
        },
        // prompt for Intern
        {
            type: 'input',
            name: 'school',
            message: 'What school do they attend?',
            default: 'non-applicable',
            when: (data) => data.role.indexOf('Intern') !=-1
        },
        // prompt for Engineer
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github username?',
            default: 'non-applicable',
            when: (data) => data.role.indexOf('Engineer') !=-1
        },
        // prompt for Manager
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is their office number?',
            default: 'non-applicable',
            when: (data) => data.role.indexOf('Manager') !=-1
        }
    ]);

    // function to generate the HTML contents with data from classes
    function generateHTML() {

    }

    // function to initialize app
    const init = () => {
            questions().then((data) => {
                try {
                    const html = generateHTML(data);
                    fs.writeFileSync('index.html', html);
                    console.log("Successfully created team profile");
                } catch (error) {
                    console.log(error);
                }
            });
        };
        
    
    // run it!
    init();