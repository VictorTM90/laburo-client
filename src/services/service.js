import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

//enviar el token en cada request que haga el usuario para checkear
service.interceptors.request.use((config) => {
  //buscar el token en el localStorage
  const storedToken = localStorage.getItem("authToken");
  //si el token existe lo añadimos a los headers del request //pasar la autorizacion como string  indicando el tipo de autenticacion. OJO CON LOS ESPACIOS!!
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };

  return config;
});

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
 
    if (error.response.status === 403) {
      return Promise.reject(error.response)
    } 
    if (error.response.status === 401) {
      //cuando queramos redirigir el navegador
      localStorage.removeItem("authToken");
      return window.location.assign("/login");
    } 

    return window.location.assign("/error");
  }
);

export default service;
