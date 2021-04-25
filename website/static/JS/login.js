function login_user() {
    const path = window.location.href;

    var login_input = document.getElementById("login-input");
    var password_input = document.getElementById("password-input");

    var product = {
        login: login_input.value,
        password: password_input.value
    };

    if (product['login'] == '' || product['password'] == '') {
        alert("Error, you did not enter any parameters!");
        return window.location.reload();
    }

    else {
        console.log(product);

        fetch(path, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(product),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(function(res) {
            if (res.status == 200) {
                console.log("Response status is " + String(res.status));
                return window.location.href = res.url;
            }

            else {
                alert("Error, the data of user is incorrect!");
                return window.location.reload();
            }
        });
    }
}