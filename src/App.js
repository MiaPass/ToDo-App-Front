import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

//components

import Home from './components/Home/Home'
import LogRegisPage from './components/Forms/User/page/Login-Regis-Page'
import RecoverPassword from './components/Forms/User/recover/Recover'

import useLocalStorage from 'use-local-storage'

// actions

// eslint-disable-next-line
import { getUser, changeTheme } from './redux/action'

// firebase

import { getAuth, onAuthStateChanged } from 'firebase/auth'

// css

import './App.css'
import Create from './components/Forms/Todo/CreateTodo'

export default function App() {
  const auth = getAuth()
  const dispatch = useDispatch()

  const [log, setLog] = useState(0)

  // user

  const id = auth.currentUser?.uid

  onAuthStateChanged(auth, (user) => {
    if ( user ){
      // User is signed in
      setLog(1)
    } else {
      // User is signed out
      setLog(2)
    }
  })

  // theme
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light',
  )

  const switchTheme = () => {
    if (log === 1) {
      // console.log(id);
      const theOne = dispatch(getUser(id))
      console.log(theOne)

      const form = {
        id: theOne._id,
        theme: theOne.theme === 'light' ? 'dark' : 'light',
      }
      dispatch(changeTheme(form))
    } else {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    }
  }

  function render() {
    if (log === 1) {
      return (
        <div>
          <Routes>
            <Route exact path="/" element={<Home log={log} id={id} />} />

            <Route path="/new" element={<Create id={id} />} />
            <Route path="/recovery" element={<RecoverPassword />} />
          </Routes>
        </div>
      )
    } else if (log === 2) {
      return (
        <div>
          <Routes>
            <Route exact path="/" element={<Home log={log} id={id} />} />
            <Route path="/login-register" element={<LogRegisPage />} />
            <Route path="/recovery" element={<RecoverPassword />} />
          </Routes>
        </div>
      )
    }
  }

  return (
    <div className="App" data-theme={theme}>
      <button onClick={switchTheme}>
        Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
      </button>

      {log !== 0 ? (
        render()
      ) : (
        <div>
          <img
            href="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Transparent-Spinner-Icon-Pehliseedhi-Suitable-.gif"
            alt="Cargando contenido..."
          />
        </div>
      )}
    </div>
  )
}
