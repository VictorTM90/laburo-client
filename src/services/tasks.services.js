import service from "./service";

const URL = "/tasks";

const getAllTasksService = () => {
  return service.get(`${URL}/`);
};

const getAllTeamworkTasksService = (id) =>{
  return service.get(`${URL}/teamwork/${id}`)
} 


const addNewTasksService = (newTask) => {
  // pasamos como parámetro lo que recogemos en el form
  return service.post(`${URL}/`, newTask);
};

const getTasksDetailsService = (id) => {
  return service.get(`${URL}/${id}`);
};

const deleteTasksService = (id) => {
  return service.delete(`${URL}/${id}`);
  //devolver directamente lo que viene del back
};

const updateTasksService = (id, updateTask) => {
  return service.patch(`${URL}/${id}`, updateTask);
};

export {
  getAllTasksService,
  addNewTasksService,
  getTasksDetailsService,
  deleteTasksService,
  updateTasksService,
  getAllTeamworkTasksService
};
