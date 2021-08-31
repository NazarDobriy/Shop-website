function Login() {
    function checkPassword(pass) {
        if (pass < 3) {
            throw new Error("Password must be greater then 3 characters!");
        }
    }

    function login_user() {
        const path = window.location.href;
    
        const login_input = document.getElementById("login-input");
        const password_input = document.getElementById("password-input");
    
        let product = {
            login: login_input.value,
            password: password_input.value
        };
    
        if (product['login'] == '' || product['password'] == '') {
            alert("Error, you did not enter any parameters!");
            return window.location.reload();
        }
    
        else {
            try {
                checkPassword(product['password']);
                
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
            
            catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="main">
            <img src="../static/img/system_login.png" alt="System login" className="system_login" />

            <div className="input">
                <input type="text" name="login" placeholder="Enter login" id="login-input" />
            </div>

            <div className="input">
                <input type="password" name="password" placeholder="Enter password" id="password-input" />
            </div>

            <button type="submit" className="btn" onClick={ login_user }>Enter</button>
            <p><a href="/password-reset" className="link-forgot" id="inscription">Forgot Password?</a></p>
        </div>
    );
}


ReactDOM.render(<Login />, document.getElementById("main"));