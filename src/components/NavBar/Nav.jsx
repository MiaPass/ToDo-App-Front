import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuth, signOut } from 'firebase/auth'

export default function Nav({ log, setOpenCreate, openCreate }) {
  const navigate = useNavigate()
  const auth = getAuth()

  const handleLogOut = (e) => {
    e.preventDefault()
    signOut(auth)
  }

  // console.log(openCreate);

  return (
    <div>
      <button className="cards-buttons" onClick={() => navigate('/new')}>
        Crear tarea
      </button>

      {log === 1 ? (
        <button className="cards-buttons" onClick={(e) => handleLogOut(e)}>
          Cerrar sesión
        </button>
      ) : (
        <button
          className="cards-buttons"
          onClick={() => navigate('/login-register')}
        >
          Registrarse / Iniciar sesión
        </button>
      )}
    </div>
  )
}
