import React from 'react'
import {NavLink} from "react-router-dom"


function Navbar() {

  return (
    <div>
    
     <NavLink to="/login" > <button> LogIn </button>    </NavLink>


     <NavLink to="/SignUp" > <button> SignUp </button>    </NavLink>
     <NavLink to="/login" > <button> LogIn </button>    </NavLink>
    
    <NavLink to="/profile"  > <button> Profile </button>    </NavLink>

    
    <NavLink to="/" > <button> Home</button>    </NavLink>
    </div>
  )
}

export default Navbar