const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
var detail;
var person;
var cards = []

function questions() {
    inquirer.prompt([
        // prompts for all entries (Employee)
        {
            type: 'list',
            name: 'role',
            message: 'In which role is the employee?',
            choices: ['Employee', 'Intern', 'Engineer', 'Manager'],
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
        // prompt for Intern detail
        {
            type: 'input',
            name: 'school',
            message: 'What school do they attend?',
            when: (data) => data.role.indexOf('Intern') !=-1
        },
        // prompt for Engineer detail
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github username?',
            when: (data) => data.role.indexOf('Engineer') !=-1
        },
        // prompt for Manager detail
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is their office number?',
            when: (data) => data.role.indexOf('Manager') !=-1
        }
    ])
    .then((data) => {
        try {     
            //define variables to be used             
            const name = data.name;
            const id = data.id;
            const email = data.email;
            const school = data.school;
            const github = data.github;
            const officeNumber = data.officeNumber;

            // check which role the person is assigned, and generate card using the class constructor
            switch(data.role) {
                case 'Employee':
                    person = new Employee(name, id, email);
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

            // add another person or move on to card deck
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'addPerson',
                    message: 'Would you like to add another person?',
                    default: true
                }
            ])
            .then((data) => {
                try {
                    (data.addPerson) ? questions() : generateCardDeck();
                } catch (error) {
                    console.log(error);
                } 
            })
        
        // catch and show the errors
        } catch (error) {
            console.log(error);
        } 
    })    
}       

// function to generate card with person data
function generateCard(person) {
    const name = person.getName();
    const role = person.getRole();
    const id = person.getId();
    const email = person.getId();

    // top portion of card with basic employee data
    let card = `
        <div class="card bg-info"> 
        <div class="card-header bg-secondary text-light">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2">${role}</h6>
        </div>
        <div class="card-body">
            <p class="card-text"><span class="text-muted">id</span> ${id}</p>
            <p class="card-text"><span class="text-muted">email</span>
                <a href="${email}"> ${email}</a></p>`;

    switch(role) {
        // if role is employee, return no additional detail
        case 'Employee':
            detail = `
            </div>
            </div>`;
            card += detail;
            break;
        // if role is intern, return school
        case 'Intern':
            const school = person.getSchool();
            detail = `
            <p class="card-text"><span class="text-muted">school</span> ${school}</p>
            </div>
            </div>`;
            card += detail;
            break;
        //if role is engineer, return Github username
        case 'Engineer':
            const github = person.getGithub();
            detail = `
            <p class="card-text"><span class="text-muted">github</span> ${github}</p>
            </div>
            </div>`;
            card += detail;
            break;
        //if role is manager, return office number
        case 'Manager':
            const officeNumber = person.officeNumber;
            detail = `
            <p class="card-text"><span class="text-muted">office</span> ${officeNumber}</p>
            </div>
            </div>`;
            card += detail;
            break;
        }
    // add person card to an array to store
    cards.push(card);
}

// join the cards within array to form the HTML contents of the card deck
function generateCardDeck() {
    let cardDeck = cards.join(' ');
    generateHTML(cardDeck);
}   

// HTML of document with the card deck added
function generateHTML(cardDeck) {
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

            ${cardDeck}

            </div>
        </div>
        <!--links-->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
    </body>
    </html>`;

    fs.writeFileSync('index.html', html);
    console.log("Successfully created team profile");
}   
    
// run it!
questions();
module.exports = Employee;