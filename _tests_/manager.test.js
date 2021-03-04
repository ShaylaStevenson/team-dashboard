const Manager = require('../lib/manager');

describe('Manager', () => {
    describe('constructor properties', () => {

        it('should return correct types of data from the constructor', () => {
            const test = new Manager('one', 1, 'uno');

            expect(typeof test.name).toBe('string');
            expect(typeof test.id).toBe('number');
            expect(typeof test.email).toBe('string');

        });

        it('should return the name, id, and email from the constructor', () => {
            const test = new Manager('Shazzy', 711, 'shazzyshay@email.com');

            expect(test.name).toBe('Shazzy');
            expect(test.id).toBe(711);
            expect(test.email).toBe('shazzyshay@email.com');
        });     
    });

    describe('getName', () => {

        it('should return the name of the person', () => {
            const test = new Manager('Shazzy', 711, 'shazzyshay@email.com');

            expect(test.getName()).toBe('Shazzy');
        });
    });

    describe('getId', () => {

        it('should return the id of the person', () => {
            const test = new Manager('Shazzy', 711, 'shazzyshay@email.com');

            expect(test.getId()).toBe(711);
        });
    });

    describe('getEmail', () => {

        it('should return the email of the person', () => {
            const test = new Manager('Shazzy', 711, 'shazzyshay@email.com');

            expect(test.getEmail()).toBe('shazzyshay@email.com');
        });
    });

    describe('getRole', () => {

        it('should return the role of the person', () => {
            const test = new Manager('Shazzy', 711, 'shazzyshay@email.com'); 

            expect(test.getRole()).toBe('Manager');
        });
    });
});
