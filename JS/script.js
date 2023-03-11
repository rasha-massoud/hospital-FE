//workshop_pages is an object that contains all the variables and functions
const workshop_pages = {};

workshop_pages.base_url = "http://localhost/archive/fsw2122/";

workshop_pages.getAPI = async (api_url) => {
    try {
        return await axios(api_url);
    } catch (error) {
        console.log("Error from GET API");
    }
}

workshop_pages.postAPI = async (api_url, api_data, api_token = null) => {
    try {
        return await axios.post(
            api_url,
            api_data,
            {
                headers: {
                    'Authorization': "token " + api_token
                }
            }
        );
    } catch (error) {
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_registration = async () => {
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


    const get_users_url = workshop_pages.base_url + "get_users.php";
    const response = await workshop_pages.getAPI(get_users_url);
    console.log(response.data);
}

workshop_pages.load_profile = () => {
    alert(x);
}


