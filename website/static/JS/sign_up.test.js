const { test, expect } = require('@jest/globals');
const testValidationForm = require('./signup');

test('Check user password', () => {
    let password = testValidationForm('naz@gamil.com', '12345678', '12345678')[1];
    if (password.length <= 7) {
        throw "The password less then 7";
    }
});

test('Check user password and confirm password', () => {
    let password = testValidationForm('naz@gamil.com', '12345678', '12345678')[1];
    let confirm_password = testValidationForm('Nazar', '12345678', '12345678')[2];
    if (password != confirm_password) {
        throw "Passwords don\'t match!";
    }
});

test('Check user email has dog', () => {
    let email = testValidationForm('naz@gamil.com', '12345678', '12345678')[0];
    let isDog = false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            isDog = true;
        }
    }

    if (isDog == false) {
        throw "Email must contain @ in the address!";
    }
});

test('Check user email has point', () => {
    let email = testValidationForm('naz@gamil.com', '12345678', '12345678')[0];
    let isPoint = false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '.') {
            isPoint = true;
        }
    }

    if (isPoint == false) {
        throw "Email must contain @ in the address!";
    }
});

test('Check user email must be greater then 4 characters', () => {
    let email = testValidationForm('naz@gamil.com', '12345678', '12345678')[0];
    if (email.length <= 4) {
        throw "Email must be greater then 4 characters!";
    }
});