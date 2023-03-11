const workshop_pages = {};

workshop_pages.base_url = "http://localhost/HospitalFullStack/Hospital_BackEnd/";

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
            // {
            //     headers: {
            //         'Authorization': "token " + api_token
            //     }
            // }
        )
    } catch (error) {
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_registration = async () => {

    document.getElementById("submit").addEventListener("click",  async () => {
        const name = document.forms["registrationForm"]["name"].value;
        const email = document.forms["registrationForm"]["email"].value;
        const password = document.forms["registrationForm"]["password"].value;
        const confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
        const dob = document.forms["registrationForm"]["dob"].value;
        const user_type_id = document.forms["registrationForm"]["user_type_id"].value;

        let data = new FormData();

        const isValidated = checkEntries(name, email, password, confirmPassword, dob, user_type_id);
        if (isValidated) {
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('dob',dob);
            data.append('user_type_id',user_type_id);
        }
        const get_users_url = workshop_pages.base_url + "registration.php";
        const response = await workshop_pages.postAPI (get_users_url, data);
    });


    const checkEntries = (name, email, password, confirmPassword, dob, user_type_id) => {
        if (!(name && email && password && confirmPassword && dob)) {
            return false;
        }

        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return false;
        }

        else if (password != confirmPassword) {
            return false;
        }
        else {
            const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            return password.match(decimal) ? true : false;
        }
    }
}
