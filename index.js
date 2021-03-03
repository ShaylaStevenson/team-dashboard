const inquirer = require('inquirer');
const fs = require('fs');
// const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

var cards = []

// questions() called at end of page. first time asking, role === "Manager".
function questions(role) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'In which role is the employee?',
            choices: ['Intern', 'Engineer'],
            when: (data) => role !== 'Manager'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is their name?',
        },
        {
            type: 'number',
            name: 'id',
            message: 'What is their ID number?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?'
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is their office number?',
            when: (data) => role === 'Manager'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school do they attend?',
            when: (data) => role !== 'Manager' && data.role.indexOf('Intern') !=-1
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github username?',
            when: (data) => role !== 'Manager' && data.role.indexOf('Engineer') !=-1
        },              
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
                case 'Intern':
                    person = new Intern(name, id, email, school);
                    generateCard(person);
                    break;
                case 'Engineer':
                    person = new Engineer(name, id, email, github);
                    generateCard(person);
                    break;
                default:
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
    const email = person.getEmail();

    // top portion of card with basic employee data
    let card = `
        <div class="card"> 
        <div class="card-header bg-secondary text-light">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2">${role}</h6>
        </div>
        <div class="card-body">
        <div class="row">
            <div class="col-3">
            <p class="card-text text-muted">id</p>
            </div>
            <div class="col">
            <p> ${id}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
            <p class="card-text text-muted">email</p>
            </div>
            <div class="col">
            <p><a target="_blank" href="mailto:${email}"> ${email}</a></p>
            </div>
        </div>`;
    switch(role) {
        // if role is intern, return school
        case 'Intern':
            const school = person.getSchool();
            detail = `
        <div class="row">
            <div class="col-3">
            <p class="card-text text-muted">school</p>
            </div>
            <div class="col">
            <p> ${school}</p>
            </div>
        </div>
        </div>
        </div>`;
            card += detail;
            break;
        //if role is engineer, return Github username
        case 'Engineer':
            const github = person.getGithub();
            detail = `
        <div class="row">
            <div class="col-3">
            <p class="card-text text-muted">github</p>
            </div>
            <div class="col">
            <p><a target="_blank" href="https://github.com/${github}"> ${github}</a></p>
            </div>
        </div>
        </div>
        </div>`;
            card += detail;
            break;
        //if role is manager, return office number
        case 'Manager':
            const officeNumber = person.officeNumber;
            detail = `
        <div class="row">
            <div class="col-3">
            <p class="card-text text-muted">office</p>
            </div>
            <div class="col">
            <p> ${officeNumber}</p>
            </div>
        </div>
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
        <link rel="stylesheet" href="dist/style.css">
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid bg-dark text-light">
            <div class="container">
            <h1>Team Dashboard</h1>
            <p>success = teamwork + effort</p>
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
    console.log('Successfully created team profile');
}   
    
// run it!
inquirer.prompt([
    {
        name: 'greeting',
        message: 'Welcome to Team Dashboard Builder!',
    },
    {
        name: 'begin',
        message: "Let's begin by inputing the team manager's information.",
    },
])
.then((data) => {
    var role = 'Manager';
    questions(role);
})