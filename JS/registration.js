const submit = document.getElementById("submit");
submit.addEventListener("click", () => {

    let isValidated = false;
    var passwordStatus = false;

    username = document.forms["registrationForm"]["username"].value;
    email = document.forms["registrationForm"]["email"].value;
    password = document.forms["registrationForm"]["password"].value;
    confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;

    isValidated = (username == "" || email == "" || password == "" || confirmPassword == "") ? false : isValidated;

    isValidated = (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? false : isValidated;

    isValidated = (password != confirmPassword) ? false : isValidated;

    passwordStatus = (password == confirmPassword) ? CheckPassword(password) : false;

    isValidated = (passwordStatus != true) ? false : true;

    const data = {
        "username": username,
        "email": email,
        "password": password,
    }

    const jsontext = document.createElement("div");
    jsontext.id = "jsontext";
    document.body.appendChild(jsontext);
    //convert JavaScript object to 
    const myJSON = JSON.stringify(data);

    if (isValidated) location.href = 'HTML/login.html';

});

function CheckPassword(password) {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal)) {
        return true;
    }
    else {
        return false;
    }
}

