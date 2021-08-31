const path = window.location.href;

let login_input = document.getElementById("user-input-login");
let email_input = document.getElementById("user-input-email");

login_input.disabled = true;
email_input.disabled = true;

function unlock_login() {
    login_input.disabled = false;
}

function unlock_email() {
    email_input.disabled = false;
}

let buttonUpdate = document.querySelector('.btn-update');
let buttonDelete = document.querySelector('.btn-delete');

buttonUpdate.addEventListener('click', () => {
    let product = {
        'login': login_input.value,
        'email': email_input.value
    };

    if (product['login'] == '' && product['email'] == '') {
        alert("Error, you don't enter any parameters!");
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
});

buttonDelete.addEventListener('click', () => {
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
                let redirect_path = window.origin;
                alert("Successfully, the user has been deleted!");
                return window.location.href = redirect_path;
            })
        }
    });
});

