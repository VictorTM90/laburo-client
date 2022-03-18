import React from 'react'
import {navLink} from "react-router-dom"


function Navbar(props) {

    console.log(props)

  return (
    <div>
    
     <navLink to="/login" > <button> LogIn </button>    </navLink>


     <navLink to="/SignUp" > <button> SignUp </button>    </navLink>
     <navLink to="/login" > <button> LogIn </button>    </navLink>
    
    <navLink to="/profile"  > <button> Profile </button>    </navLink>


    <navLink to="/teamwork"  />
    <navLink to= "/teamwork/newtask" />
    
    <navLink to="/" > <button> Log Out </button>    </navLink>
    </div>
  )
}

export default Navbar