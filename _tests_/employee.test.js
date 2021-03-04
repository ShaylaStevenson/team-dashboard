const { it, expect, test } = require("@jest/globals");
const Employee = require('../lib/Employee');

describe('Employee', () => {
    describe('constructor properties', () => {

        it('should return correct types of data from the constructor', () => {
            const test = new Employee('one', 1, 'uno');

            expect(typeof test.name).toBe('string');
            expect(typeof test.id).toBe('number');
            expect(typeof test.email).toBe('string');

        });

        it('should return the name, id, and email from the constructor', () => {
            const test = new Employee('Shazzy', 711, 'shazzyshay@email.com');

            expect(test.name).toBe('Shazzy');
            expect(test.id).toBe(711);
            expect(test.email).toBe('shazzyshay@email.com');
        });     
    });
});