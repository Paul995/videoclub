import { useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import Admin from "../Admin/Admin";
import "./App.css";

export const AppContext = React.createContext();

function App() {
  {
    /* gestion du login  */
  }
  //const [estLog, setEstLog] = useState(false);
  const [logging, setLogging] = useState({ estLog: false, usager: "" });

  function login(e) {
    e.preventDefault();

    if (e.target.usager.value == "admin") {
     
      // setEstLog(prevEstLog => !prevEstLog)
      //                       ca change juste ceux ici car spread operator
      setLogging((logging) => ({
        ...logging,
        estLog: true,
        usager: e.target.usager.value,
      }));
       e.target.reset();
    }
  }

  function logout(){
    setLogging({
      estLog: false,
      usager: ""
    });
  }

  return (
    <AppContext.Provider value={logging}>
      {" "}
      {/* // ici vu que cest de linfo qui devra etre utilisee dans plusieurs components */}
      <Router>
        {/* <Entete handleLogin={login} estLog={estLog}/> */}
        <Entete handleLogin={login} logging={logging} handleLogout={logout} />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />} />
          {/* <Route path="/admin" element={estLog ? <Admin /> : <Navigate to ="/" />} /> */}
          <Route
            path="/admin"
            element={logging.estLog ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
