function isPhoneNumber(number) {
    if (number.length != 13) {
        return false;
    }

    if (number[0] == '+' && number[1] == '3' && number[2] == '8' && number[3] == '0') {
        return true;
    }
    return false;
}

function send_contact() {
    const path = window.location.href;

    var name = document.getElementById("name");
    var phone = document.getElementById("phone");

    var contact = {
        name: name.value,
        phone: phone.value
    };

    if (contact['name'] == '' || contact['phone'] == '') {
        alert("Error, you did not enter any parameters!");
        return window.location.reload();
    }

    else if (isPhoneNumber(phone.value) == false) {
        alert("Error, you enter the phone number incorrect! Number must be write in format +380*********");
        return window.location.reload();
    }

    else {
        console.log(contact);

        fetch(path, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(contact),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(function(res) {
            if (res.status == 200) {
                console.log("Response status is " + String(res.status));
                alert("Successfully, you have sent your contacts, they will be reviewed soon!");
                return window.location.href = window.origin;
                
            }

            else {
                alert("Error, the data of user is incorrect!");
                return window.location.reload();
            }
        });
    }
}