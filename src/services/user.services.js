import service from "./service";

const URL = "/user";

const getAllUsersService = () =>{
    return service.get(`${URL}/`)
}

const getUsersDetailsService = (id) =>{
    return service.get(`${URL}/${id}`)
}

export{ 
    getAllUsersService,
    getUsersDetailsService,
}