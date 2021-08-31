function isPhoneNumber(number) {
    if (number.length != 13) {
        throw new Error('Your phone number length is incorrect!');
    }

    if (number.search('+380') !== 0) {
        throw new Error("You enter the phone number incorrect! Number must be write in format +380*********");
    }
}

function send_contact() {
    const path = window.location.href;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    let contact = {
        name: name.value,
        phone: phone.value
    };

    if (contact['name'] == '' || contact['phone'] == '') {
        alert("Error, you did not enter any parameters!");
        return window.location.reload();
    }

    else {
        try {
            isPhoneNumber(contact['phone']);

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
        
        catch (error) {
            alert(error.message);
            return window.location.reload();
        }
    }
}