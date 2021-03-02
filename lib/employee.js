class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
        //let nameField = (name !== '') ? `<h5 class="card-title">${this.name}</h5>` : '';

        // if (name !== '') {
        //     var nameField = `<h5 class="card-title">${this.name}</h5>`
        // } else {
        //     nameField = '';
        // }
    }

    getId() {
        return this.id;

        //let idField = (id !== '') ? `<p class="card-text"><span class="text-muted">id</span>${ this.id}</p>` : '';

        // if (id !== '') {
        //     const idField = `<p class="card-text"><span class="text-muted">id</span>${ this.id}</p>`;
        // } else {
        //     idField = '';
        // }
    }

    getEmail() {
        return this.email;
        // let emailField = (email !== '') ? `<p class="card-text"><span class="text-muted">email</span>
        // <a href="${this.email}"> ${this.email}</a></p>` : '';

        // if (email !== '') {
        //     const emailField = `<p class="card-text"><span class="text-muted">email</span>
        //     <a href="${this.email}"> ${this.email}</a></p>`;
        // } else {
        //     emailField = '';
        // }
    }

    getRole() {
        return 'Employee';
        //const roleField = `<h6 class="card-subtitle mb-2">Employee</h6>`;
    }
    
}
// 
// console.log(getName);
// console.log(idField);
// console.log(getId);
// console.log(emailField);
// console.log(getEmail);
// console.log(roleField);
// console.log(getRole);

// const employee = new Employee(name, id, email);
// employee.generateCard
//thoughts



module.exports = Employee;