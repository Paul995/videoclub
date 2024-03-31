import { NavLink } from "react-router-dom";
import "./Entete.css";
import { useContext } from "react";
import { AppContext } from "../App/App";

function Entete(props) {
  const context = useContext(AppContext);

  return (
    <header>
      <NavLink to="/">
        <h1>Videoclub</h1>
      </NavLink>
      <nav>
        {/* {props.estLog ? <NavLink to="/admin">Admin</NavLink> : ""}  */}
        {context.estLog ? (
          <nav>
            <NavLink to="/admin">Profil</NavLink>
            <NavLink to="/admin/ajout-film">Ajouter un Film</NavLink>
          </nav>
        ) : (
          ""
        )}

     
        <NavLink to="/liste-films">Liste des Films</NavLink>
      </nav>
      {context.estLog ? (
        <button onClick={props.handleLogout}>Logout</button>
      ) : (
        <form onSubmit={props.handleLogin}>
          <input type="text" name="courriel" placeholder="Usager"></input>
          <input type="password" name="mdp" placeholder="mot de passe"></input>
          <button>Connexion</button>
        </form>
      )}
    </header>
  );
}

export default Entete;
