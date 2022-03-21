import service from "./service";


const URL = '/teamwork'


  const getAllTeamworkService = () =>{
    return service.get(`${URL}/`)
} 

const addNewTeamworkService = (newTeamwork) =>{

      // pasamos como parámetro lo que recogemos en el form 
  return service.post(`${URL}/`, newTeamwork)
}; 

  const getTeamworkDetailsService = (id) =>{
      return service.get(`${URL}/${id}`)
  }

  const deleteTeamworkService = (id) =>{
      return service.delete(`${URL}/${id}`)
  }; 

  
  const updateTeamworkService = (id, updateTeamwork) =>{
      return service.patch(`${URL}/${id}`, updateTeamwork)
  }


  const removeMemberService = (id, userId)=>{
      return service.patch (`${URL}/${id}/remove/${userId}`)
  }

  const quitMemberService = (id) =>{
      // este id es el del teamwork que se pasará al backend para localizarlo en la bd. 
      return service.patch (`${URL}/${id}/quit`)
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