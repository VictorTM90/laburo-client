import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/auth`,
});

//enviar el token en cada request que haga el usuario para checkear
service.interceptors.request.use((config) => {
  //buscar el token en el localStorage
  const storedToken = localStorage.getItem("authToken");
  //si el token existe lo añadimos a los headers del request //pasar la autorizacion como string  indicando el tipo de autenticacion. OJO CON LOS ESPACIOS!!
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  console.log(storedToken);

  return config;
});

const signupService = (user) => {
  return service.post("/signup", user);
};

const loginService = (user) => {
  return service.post("/login", user);
};

const verifyService = () => {
  return service.get("/verify");
};

export { signupService, loginService, verifyService };
