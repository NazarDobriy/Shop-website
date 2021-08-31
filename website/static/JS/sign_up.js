function Sign_up() {  
    function checkEmail(str) {
        if (str.length <= 4) {
            throw new Error("Email must be greater then 4 characters!");
        }

        if (str.search('.com') === -1) {
            throw new Error("Email must contain .com in the end!")
        }

        if (str.search('@') === -1) {
            throw new Error("mail must contain @ in the address!");
        }
    }

    function checkPasswords(mainPass, confirmPass) {
        if (mainPass !== confirmPass) {
            throw new Error("Passwords don\'t match!");
        }

        if (mainPass.length < 3 || confirmPass.length < 3) {
            throw new Error("Password must be greater then 3 characters!");
        }
    }

    function validationForm() {
        const email = document.forms['registrationForm']['email'].value;
        const password = document.forms['registrationForm']['password'].value;
        const confirmPassword = document.forms['registrationForm']['confirm-password'].value;

        try {
            checkEmail(email);
            checkPasswords(password, confirmPassword);
            alert('Successfully, user is created!');
        } 
        
        catch (error) {
            alert(error.message);
            window.location.reload();
        }
    }

    return (
        <div className="main">
            <img src="../static/img/person_sign_up.png" alt="Person" className="system_sign_up" />
            <form method="POST" name="registrationForm" onSubmit={ validationForm }>
                <div className="input">
                    <input type="email" name="email" placeholder="Enter email" />
                </div>
                <div className="input">
                    <input type="text" name="login" placeholder="Enter login" />
                </div>
                <div className="input">
                    <input type="password" name="password" placeholder="Enter password" />
                </div>
                <div className="input">
                    <input type="password" name="confirm-password" placeholder="Confirm password" />
                </div>
                    <button type="submit" className="btn">Enter</button>
            </form>
        </div>
    );
}

ReactDOM.render(<Sign_up />, document.getElementById("main"));