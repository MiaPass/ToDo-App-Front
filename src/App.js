import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

//components

import Home from "./components/Home/Home";
import LogRegisPage from "./components/Forms/User/Login-Regis-Page";

import useLocalStorage from "use-local-storage";

// firebase

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { useUser } from "reactfire";

// css

import "./App.css";

export default function App() {
  const [log, setLog] = useState(0);
  const auth = getAuth();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // const user = useUser();

  // user

  useEffect(() => {
    setInterval(() => {
      // dispatch(getMyProfile(auth.currentUser.uid));
      // console.log("llamo ahora");
    }, 15000);
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLog(1);
    } else {
      // User is signed out
      setLog(2);
    }
  });

  const handleLogOut = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  // theme
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  function render() {
    if (log === 1) {
      return (
        <div>
          <button onClick={(e) => handleLogOut(e)}> Cerrar sesión</button>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      );
    } else if (log === 2) {
      return (
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login-register" element={<LogRegisPage />} />
          </Routes>
        </div>
      );
    }
  }

  return (
    <div className="App" data-theme={theme}>
      <button onClick={switchTheme}>
        Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
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
  );
}
