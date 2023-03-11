//workshop_pages is an object that contains all the variables and functions
const workshop_pages = {};

workshop_pages.base_url = "http://localhost/archive/fsw2122/";

workshop_pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API");
    }
}

workshop_pages.postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            {
                headers:{
                    'Authorization' : "token " + api_token
                }
            }
        );
    }catch(error){
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_landing = async () => {
    const get_users_url = workshop_pages.base_url + "get_users.php";
    const response = await workshop_pages.getAPI(get_users_url);
    console.log(response.data);
}

workshop_pages.load_profile = () => {
    alert(x);
}


