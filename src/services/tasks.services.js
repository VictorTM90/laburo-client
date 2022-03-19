import axios from "axios";

const service = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/tasks`
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

  const getAllTasksService = () =>{
      return service.get("/")
  } 

  const addNewTasksService = (newTask) =>{
        // pasamos como parámetro lo que recogemos en el form 
        console.log(newTask, "hola")
    return service.post("/", newTask)
    
}; 

    const getTasksDetailsService = (id) =>{
        return service.get(`/${id}`)
    }

    const deleteTasksService = (id) =>{
        return service.delete(`/${id}`)
    }; 

    
    const updateTasksService = (id, updateTask) =>{
        return service.patch(`/${id}`, updateTask)
    }

    export{
        getAllTasksService,
        addNewTasksService,
        getTasksDetailsService,
        deleteTasksService,
        updateTasksService
    }