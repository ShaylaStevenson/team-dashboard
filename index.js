const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const questions = () =>
    inquirer.prompt([
        // prompts for all entries (Employee)
        {
            type: 'list',
            name: 'role',
            message: 'In which role is the employee?',
            choices: ['Intern', 'Employee', 'Engineer', 'Manager'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is their name?',
        },
        {
            type: 'number',
            name: 'id',
            message: 'What is their ID number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?',
        },
        // prompt for Intern
        {
            type: 'input',
            name: 'school',
            message: 'What school do they attend?',
            when: (data) => data.role.indexOf('Intern') !=-1
        },
        // prompt for Engineer
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github username?',
            when: (data) => data.role.indexOf('Engineer') !=-1
        },
        // prompt for Manager
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is their office number?',
            when: (data) => data.role.indexOf('Manager') !=-1
        },
    ]);    
        

    //var person;
    var cards = []

    // function to initialize app
    const init = () => {
            questions().then((data) => {
                
                try {                  
                    // const html = generateHTML();
                    console.log(data.name);
                    switch(data.role) {
                        case 'Employee':
                            let person = new Employee(name, id, email);
                            generateCard(person);
                            break;
                        case 'Intern':
                            person = new Intern(name, id, email, school);
                            generateCard(person);
                            break;
                        case 'Engineer':
                            person = new Engineer(name, id, email, github);
                            generateCard(person);
                            break;
                        case 'Manager':
                            person = new Manager(name, id, email, officeNumber);
                            generateCard(person);
                            break;
                    }

                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'addPerson',
                            message: 'Would you like to add another person?',
                        }
                    ])
                    // .then((data) => {
                    //     (addPerson) ? init() : generateCardDeck();
                    // })

                    // if (data.role.indexOf('Employee') !=-1) {
                    //     const employee = new Employee(name, id, email);
                    //     employee.generateCard();
                    // } else if (data.role.indexOf('Intern') !=-1) {
                    //     const intern = new Intern(name, id, email, school);
                    //     intern.generateCard();
                    // } else if (data.role.indexOf('Engineer') !=-1) {
                    //     const engineer = new Engineer(name, id, email, github);
                    //     engineer.generateCard();
                    // } else {
                    //     const manager = new Manager(name, id, email, officeNumber);
                    //     manager.generateCard();
                    // }


                    // fs.writeFileSync('index.html', html);
                    // console.log("Successfully created team profile");
                } catch (error) {
                    console.log(error);
                }
            });
    };
    
    // function to generate card with person data
    function generateCard(person) {
        const name = person.getName();
        const role = person.getRole();
        const id = person.getId();
        const email = person.getId();

        const card = `
            <div class="card bg-info"> 
            <div class="card-header bg-secondary text-light">
                <h5 class="card-title">${ name}</h5>
                <h6 class="card-subtitle mb-2">${ role}</h6>
            </div>
            <div class="card-body">
                <p class="card-text"><span class="text-muted">id</span>${ id}</p>
                <p class="card-text"><span class="text-muted">email</span>
                    <a href="${email}"> ${ email}</a></p>`;

        switch(data.role) {
            // if role is employee, return no additional detail
            case 'Employee':
                const detail = `
                </div>
                </div>`;
                card += detail;
                break;
            // if role is intern, return school
            case 'Intern':
                const school = person.getSchool();
                detail = `
                <p class="card-text"><span class="text-muted">school</span>${ school}</p>
                </div>
                </div>`;
                card += detail;
                break;
            //if role is engineer, return Github username
            case 'Engineer':
                const github = person.github();
                detail = `
                <p class="card-text"><span class="text-muted">github</span>${ github}</p>
                </div>
                </div>`;
                card += detail;
                break;
            //if role is manager, return office number
            case 'Manager':
                const officeNumber = person.officeNumber;
                detail = `
                <p class="card-text"><span class="text-muted">office</span>${ officeNumber}</p>
                </div>
                </div>`;
                card += detail;
                break;
        }
        cards.push(card);
    }

    function generateCardDeck() {
        const cardDeck = '';
        cards.forEach(function(card) {
            cardDeck += card;
        })
        cardDeck.join(' ');
        console.log(cardDeck);
    }

    function generateHTML() {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Profile</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
            <link href="dist/style.css">
        </head>
        <body>
            <div class="jumbotron jumbotron-fluid bg-dark text-light">
                <div class="container">
                <h1>Team Profile</h1>
                <p>Success = Interns + Engineers + Managers</p>
                </div>
            </div>
            <!--card deck-->
            <div class="container">
                <div class="card-deck">

                <!-- cards append here -->

                </div>
            </div>
            <!--links-->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
        </body>
        </html>`;
    }
    
    // run it!
    init();
    module.exports = Employee;