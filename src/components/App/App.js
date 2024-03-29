import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import Admin from "../Admin/Admin";
import FormFilm from "../FormFilm/FormFilm";
import "./App.css";
import { jwtDecode } from "jwt-decode";

// pour framer-motion
import { AnimatePresence } from "framer-motion";

import PrivateRoute from "../../PrivateRoute";


export const AppContext = React.createContext();

function App() {
  {
    /* gestion du login  */
  }



  //const [estLog, setEstLog] = useState(false);
  const [logging, setLogging] = useState({ estLog: false, usager: "" });

  const location = useLocation();

  async function login(e) {

    e.preventDefault();

    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp: form.mdp.value,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    //                                      METTRE PORT DE NODE ICI!!!!!!!!!!
    const reponse = await fetch(
      "http://localhost:3301/utilisateurs/connexion",
      data
    );


    const token = await reponse.json(); // je recois un reponse, deconstruit (async), ensuit metre dans var reponse



    if (reponse.status == 200) {
      //storer le jeton dans le localstorge
      localStorage.setItem("API-films", token);
      setLogging({ estLog: true, usager: body.courriel })
     // console.log(jetonValide());
    }

    form.reset(); //pour vider le champ

    /////////////////////////////////////////////////////
    // if (e.target.usager.value == "admin") {
    //   // setEstLog(prevEstLog => !prevEstLog)
    //   //                       ca change juste ceux ici car spread operator
    //   setLogging((logging) => ({
    //     ...logging,
    //     estLog: true,
    //     usager: e.target.usager.value,
    //   }));
    //   e.target.reset();
    // }
  }

  function jetonValide() {
    try {
      const token = localStorage.getItem("API-films");
      const decode = jwtDecode(token);
      if (Date.now() < decode.exp * 1000) {
        return true;
      } else {
        localStorage.removeItem("API-films")
      }
    } catch (erreur) {}
  }

  function logout() {
    setLogging({
      estLog: false,
      usager: "",
    });
  }

  /////////////////////////////////////////////

  return (
    <AppContext.Provider value={logging}>
      {" "}
      {/* // ici vu que cest de linfo qui devra etre utilisee dans plusieurs components */}
      {/* <Router> */}
      {/* <Entete handleLogin={login} estLog={estLog}/> */}
      <Entete handleLogin={login} logging={logging} handleLogout={logout} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          

          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />} />
          {/* <Route path="/admin" element={estLog ? <Admin /> : <Navigate to ="/" />} /> */}

          <Route element={<PrivateRoute/>}>
            <Route
              path="/admin"
              element={<Admin />}
            />
            
          </Route>

          <Route
              path="/admin/ajout-film"
              element={<FormFilm />}
            />
        </Routes>


      </AnimatePresence>
      {/* </Router> */}
    </AppContext.Provider>
  );
}

export default App;
