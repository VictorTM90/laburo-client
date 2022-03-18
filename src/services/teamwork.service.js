import axios from "axios";


const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/teamwork`
  })
  
  // esta configuracion nos permite enviar el Token en cada request que se haga
  service.interceptors.request.use((config) => {
    // aqui buscamos el token en localstorage
    const storedToken = localStorage.getItem("authToken")
    // si el toke existe lo agregamos a los headers del request
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}` }
    // el condicional abajo hace lo mismo que arriba
    // if (storedToken) {
    //   config.headers = { Authorization: `Bearer ${storedToken}` }
    // }
    return config;
  })


  const getAllTeamworkService = () =>{
    return service.get("/")
} 

const addNewTeamworkService = (newTeamwork) =>{
      // pasamos como parámetro lo que recogemos en el form 
  return service.post("/", newTeamwork)
}; 

  const getTeamworkDetailsService = (id) =>{
      return service.get(`/${id}`)
  }

  const deleteTeamworkService = (id) =>{
      return service.delete(`/${id}`)
  }; 

  
  const updateTeamworkService = (id, updateTeamwork) =>{
      return service.patch(`/${id}`, updateTeamwork)
  }


  const removeMemberService = (id, userId)=>{
      return service.patch (`/${id}/remove/${userId}`)
  }

  const quitMemberService = (id) =>{
      // este id es el del teamwork que se pasará al backend para localizarlo en la bd. 
      return service.patch (`/${id}/quit`)
  }

  export{
      getAllTeamworkService,
      addNewTeamworkService,
      getTeamworkDetailsService,
      deleteTeamworkService,
      updateTeamworkService,
      removeMemberService, 
      quitMemberService
      
  }