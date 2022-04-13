# LABURO

## Description

Laburo is a calendar platform for organising all kind of tasks. User can create a teamwork with other users and assing tasks.

## User Stories

- **Signup:** As an anon I can sign up in the platform so that I can start adding tasks to my calendar.
- **Login:** As a user I can login to the platform so I can see my calendar and start adding tasks or create a teamwork.
- **Logout:** As a user I can log out from the platform so no one else can use it.
- **Add, read, edit, and delete tasks:** As a user I can add a task to my calendar to organise my time and modify or delete them.
- **Create, read, edit, and delete teamworks:** As a user I can create a new teamwork adding other users with a searchbar. I can edit and delete the whole teamwork or delete just a member. If I assign a task to a specific member, they will have the task in their personal dashboard.

## Backlog:

Teamwork:

- The assigned tasks appear in the team dashboard and in the member personal dashboard.

- Drag and resize the task in the calendar.

- Validations in the members searchbar.

# Client

## Services

auth.services.js

```
- signupService: /auth/signup,
- loginService: /auth/login,
- verifyService: /auth/verify,

```

tasks.services.js

```
- getAllTasksService: service.getservice.get(`/tasks/`)
- getAllTeamworkTasksService: service.get(`/tasks/teamwork/${id}`
- addNewTasksService: service.post(`/tasks/`, newTask)
- getTasksDetailsService: service.get(`/tasks/${id}`)
- deleteTasksService: service.delete(`/tasks/${id}`)
- updateTasksService: service.patch(`/tasks/${id}`, updateTask)
```

teamwork.services.js

```
- getAllTeamworkService: service.get(`/teamwork/`)
- addNewTeamworkService: service.post(`/teamwork/`, newTeamwork)
- getTeamworkDetailsService: service.get(`/teamwork/${id}`)
- getTeamworkByIdCreator: service.get(`/teamwork/creatorteams`)
- deleteTeamworkService: service.delete(`/teamwork/${id}`)
- updateTeamworkService: service.patch(`/teamwork/${id}`, updateTeamwork)
- removeMemberService: service.patch (`/teamwork/${id}/remove/${userId}`)
```

user.services.js

```
- getAllUsersService: service.get(`/user/`)
- getUsersDetailsService: service.get(`/user/${id}`)
```

## Frontend Routes && general component

App.js

```
- component:<NavbarMUI/>
```

```
- path='/login' element={<Login />},
- path='/signup' element={<Signup />},
- path='/logout' element={<Logout />},
- path='/profile' element={<Profile />},
- path='/task/new' element={<TaskDetail />},
- path='/task/:id' element={<Task />},
- path='/teamwork/new' element={<NewTeamworks />},
- path='/teamwork/:id' element={<NewTeamworks />},
- path='/teamwork/:id/edit' element={<NewTeamworks />},
- path='/teamwork' element={<TeamworkList />},
- path='/error' element={<Error />}
- path='*' element={<Login />}
```

## Pages && components

Anon only:

- Login
- Signup 
- Error 

User only:

- Logout 
- Profile  : 
    - component: 
        - Dashboard: user personal calendar
            -component: 
            - Modal (component MUI) - DashboardDetail - Modal: user can read its own tasks by clicking in them. The information will be displayed as a modal. User can delete task directly.
- Task :
    component:
    -  TaskDetail: read and update tasks created by user.
- NewTeamworks: create, read and update teamworks
- TeamworkList: list of all teamworks,  user can delete.

### Git

https://github.com/VictorTM90/laburo-server
https://github.com/VictorTM90/laburo-client
https://laburo.netlify.app/