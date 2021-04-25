function isDotComInEmail(email) {
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '.') {
            i++;
            if (email[i] == 'c' && i < email.length) {
                i++;
                if (email[i] == 'o' && i < email.length) {
                    i++;
                    if (email[i] == 'm' && i < email.length) {
                        return true;
                    }

                    else {
                        return false;
                    }
                }

                else {
                    return false;
                }
            }

            else {
                return false;
            }
        }
    }
}

function isDogInEmail(email) {
    for (let letter of email) {
        if (letter == '@') {
            return true;
        }
    }
    return false;
}

function validationForm() {
    let email = document.forms['registrationForm']['email'].value;
    let password = document.forms['registrationForm']['password'].value;
    let confirmPassword = document.forms['registrationForm']['confirm-password'].value;

    if (email <= 4) {
        alert('Email must be greater then 4 characters!');
        window.location.reload();
        return false;
    }

    else if (isDotComInEmail(email) == false) {
        alert('Email must contain .com in the end!');
        window.location.reload();
        return false;
    }

    else if (isDogInEmail(email) == false) {
        alert('Email must contain @ in the address!');
        window.location.reload();
        return false;
    }

    else if (password != confirmPassword) {
        alert('Passwords don\'t match!');
        window.location.reload();
        return false;
    }

    else if (password.length <= 3) {
        alert('Password must be greater then 3 characters!');
        window.location.reload();
        return false;
    }

    else {
        alert('Successfully, user is created!');
    }
}