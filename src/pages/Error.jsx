import React from 'react'
import { Link } from 'react-router-dom'




function Error() {
  return (
    <div>
    <h2>VAYA! Ha habido un error. </h2>
    <p>Somos desarrolladores baby todavía... haz click 
    <Link to='/profile'>aquí</Link> para ir a tu perfil. </p>
    </div>
  )
}

export default Error