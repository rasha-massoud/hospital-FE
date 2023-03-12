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
    let data = new FormData();

    document.getElementById("submit").addEventListener("click", () => {
        const name = document.forms["registrationForm"]["name"].value;
        const email = document.forms["registrationForm"]["email"].value;
        const password = document.forms["registrationForm"]["password"].value;
        const confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
        const dob = document.forms["registrationForm"]["dob"].value;
        const user_type_id = document.forms["registrationForm"]["user_type_id"].value;


        const isValidated = checkEntries(name, email, password, confirmPassword, dob, user_type_id);
        if (isValidated) {
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('dob', dob);
            if (user_type_id == "patient") {
                data.append('user_type_id', 1);
            } else if (user_type_id == "employee") {
                data.append('user_type_id', 2);
            } else {
                data.append('user_type_id', 3);
            }

            const get_users_url = workshop_pages.base_url + "registration.php";

            axios({
                "method": "post",
                "url": get_users_url,
                "data": data
            }).then((result) => {
                // console.log(result.data);
            }).catch((err) => {
                console.error(err);
            });
        }
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

workshop_pages.load_login = async () => {

    document.getElementById("signIn").addEventListener("click", () => {
        const email = document.forms["registrationForm"]["email"].value;
        const password = document.forms["registrationForm"]["password"].value;

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);

        const get_users_url = workshop_pages.base_url + "login.php";

        axios({
            "method": "post",
            "url": get_users_url,
            "data": data
        }).then((result) => {
            console.log(result.data.user_type_id);
        }).catch((err) => {
            console.error(err);
        });
    });
}

workshop_pages.load_hospital = async () => {
    window.onload = function () {
        const categories = document.getElementById("colDisplay")
        const get_hosp_url = workshop_pages.base_url + "hospital.php";

        axios.get(get_hosp_url)
            .then(function (response) {
                const hospitals = response.data;
                hospitals.forEach(hospital => {
                    const html = `
                    <div class="colDisplay">
                        <div class="rowDisplay" id="usersData">
                            <h2 class="rowData" id="idGet">${hospital.id}</h2>
                            <h2 class="rowData" id="nameGet">${hospital.name}</h2>
                            <h2 class="rowData" id="addressGet">${hospital.address}</h2>
                            <h2 class="rowData" id="phoneNumberGet">${hospital.phone_number}</h2>
                            <h2 class="rowData" id="emailGet">${hospital.email}</h2>
                            <h2 class="rowData" id="facebookUrlGet">${hospital.facebook_url}</h2>
                        </div>
                    </div>
            `;
                    categories.insertAdjacentHTML("beforeend", html);
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

workshop_pages.load_employee = async () => {
    window.onload = function () {
        const categories = document.getElementById("colDisplay")
        const get_emp_url = workshop_pages.base_url + "employee.php";

        axios.get(get_emp_url)
            .then(function (response) {
                const employees = response.data;
                employees.forEach(employee => {
                    const html = `
                    <div class="colDisplay">
                        <div class="rowDisplay" id="usersData">
                            <h2 class="rowData" id="idGet">${employee.id}</h2>
                            <h2 class="rowData" id="userIdGet">${employee.user_id}</h2>
                            <h2 class="rowData" id="ssnGet">${employee.SSN}</h2>
                            <h2 class="rowData" id="dateJoinedGet">${employee.date_joined}</h2>
                            <h2 class="rowData" id="positionGet">${employee.position}</h2>
                            <h2 class="rowData" id="hospitalIdGet">${employee.hospital_id}</h2>
                        </div>
                    </div>
                    `;
                    categories.insertAdjacentHTML("beforeend", html);
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

workshop_pages.load_patient = async () => {
    window.onload = function () {
        const categories = document.getElementById("colDisplay")
        const get_patient_url = workshop_pages.base_url + "patient.php";

        axios.get(get_patient_url)
            .then(function (response) {
                const patients = response.data;
                patients.forEach(patient => {
                    const html = `
                    <div class="colDisplay">
                        <div class="rowDisplay" id="usersData">
                            <h2 class="rowData" id="idGet">${patient.id}</h2>
                            <h2 class="rowData" id="userIdGet">${patient.user_id}</h2>
                            <h2 class="rowData" id="bloodTypeGet">${patient.blood_type}</h2>
                            <h2 class="rowData" id="ehrGet">${patient.EHR}</h2>
                        </div>
                    </div>
                    `;
                    categories.insertAdjacentHTML("beforeend", html);
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

workshop_pages.load_patientToHosp = async () => {
    let data = new FormData();

    document.getElementById("save").addEventListener("click", () => {
        const user_id = document.forms["registrationForm"]["user_id"].value;
        const hospital_id = document.forms["registrationForm"]["hospital_id"].value;
        const is_active = document.forms["registrationForm"]["is_active"].value;
        const date_joined = document.forms["registrationForm"]["date_joined"].value;
        const date_left = document.forms["registrationForm"]["date_left"].value;

        data.append('user_id', user_id);
        data.append('hospital_id', hospital_id);
        data.append('is_active', is_active);
        data.append('date_joined', date_joined);
        data.append('date_left', date_left);

        const get_users_url = workshop_pages.base_url + "employeeToHosp.php";

        axios({
            "method": "post",
            "url": get_users_url,
            "data": data
        }).then((result) => {
            // console.log(result.data);
        }).catch((err) => {
            console.error(err);
        });
    });
}

workshop_pages.load_employeeToHosp = async () => {
    window.onload = function () {
        const categories = document.getElementById("colDisplay")
        const get_patient_url = workshop_pages.base_url + "employeeToHosp.php";

        axios.get(get_patient_url)
            .then(function (response) {
                const links = response.data;
                links.forEach(link => {
                    const html = `
                    <div class="colDisplay">
                        <div class="rowDisplay" id="usersData">
                            <h2 class="rowData" id="hospitalIdGet">${link.hospital_id}</h2>
                            <h2 class="rowData" id="userIdGet">${link.user_id}</h2>
                            <h2 class="rowData" id="active">${link.is_active}</h2>
                            <h2 class="rowData" id="dateJoinedGet">${link.date_joined}</h2>
                            <h2 class="rowData" id="dateLetfGet">${link.date_left}</h2>
                        </div>
                    </div>
                    `;
                    categories.insertAdjacentHTML("beforeend", html);
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

workshop_pages.load_patientToHospDisplay = async () => {
    window.onload = function () {
        const categories = document.getElementById("colDisplay")
        const get_patient_url = workshop_pages.base_url + "patientToHospDisplay.php";

        axios.get(get_patient_url)
            .then(function (response) {
                const links = response.data;
                links.forEach(link => {
                    const html = `
                    <div class="colDisplay">
                        <div class="rowDisplay" id="usersData">
                            <h2 class="rowData" id="hospitalIdGet">${link.hospital_id}</h2>
                            <h2 class="rowData" id="userIdGet">${link.user_id}</h2>
                            <h2 class="rowData" id="active">${link.is_active}</h2>
                            <h2 class="rowData" id="dateJoinedGet">${link.date_joined}</h2>
                            <h2 class="rowData" id="dateLetfGet">${link.date_left}</h2>
                        </div>
                    </div>
                    `;
                    categories.insertAdjacentHTML("beforeend", html);
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

workshop_pages.load_department = async () => {
    let data = new FormData();

    document.getElementById("save").addEventListener("click", () => {
        const user_id = document.forms["registrationForm"]["user_id"].value;
        const department_id = document.forms["registrationForm"]["department_id"].value;
        const hospital_id = document.forms["registrationForm"]["hospital_id"].value;
        const room_id = document.forms["registrationForm"]["room_id"].value;
        const datetime_entered = document.forms["registrationForm"]["datetime_entered"].value;
        const datetime_left = document.forms["registrationForm"]["datetime_left"].value;
        const bed_number = document.forms["registrationForm"]["bed_number"].value;

        data.append('user_id', user_id);
        data.append('department_id', department_id);
        data.append('hospital_id', hospital_id);
        data.append('room_id', room_id);
        data.append('datetime_entered', datetime_entered);
        data.append('datetime_left', datetime_left);
        data.append('bed_number', bed_number);

        const get_users_url = workshop_pages.base_url + "department.php";

        axios({
            "method": "post",
            "url": get_users_url,
            "data": data
        }).then((result) => {
            // console.log(result.data);
        }).catch((err) => {
            console.error(err);
        });
    });
}