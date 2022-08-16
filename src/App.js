import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

import useLocalStorage from "use-local-storage";

import "./App.css";

export default function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <button onClick={switchTheme}>
        Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
      </button>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
