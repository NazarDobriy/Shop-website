var login_input = document.getElementById("user-input-login");
var email_input = document.getElementById("user-input-email");

login_input.disabled = true;
email_input.disabled = true;

function unblock_login() {
    login_input.disabled = false;
}

function unblock_email() {
    email_input.disabled = false;
}

function user_delete() {
    const path = window.location.href;

    fetch(path, {
        method: "DELETE",
        credentials: "include",
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(function (res) {
        if (res.status != 200) {
            console.log("Response status is " + String(res.status));
            return alert("Error, the user cannot be deleted!");
        }

        else {
            res.json().then(function (data) {
                console.log(data[0]);
                var redirect_path = window.origin;
                alert("Successfully, the user has been deleted!");
                return window.location.href = redirect_path;
            })
        }
    });
}

function user_update() {
    const path = window.location.href;

    var product = {};

    if (login_input.value != '') {
        product['login'] = login_input.value;
    }

    if (email_input.value != '') {
        product['email'] = email_input.value;
    }

    if (Object.keys(product).length == 0) {
        alert("Error, you did not enter any parameters!");
        return window.location.reload();
    }

    else {
        console.log(product);

        fetch(path, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(product),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(function (res) {
            if (res.status != 200) {
                console.log("Response status is " + String(res.status));
                return alert("Error, the user cannot be updated!");
            }
    
            else {
                res.json().then(function (data) {
                    console.log(data[0]);
                    alert("Successfully, the user has been updated!");
                    return window.location.reload();
                })
            }
        });
    }
}

