import { NavLink } from  'react-router-dom';
import './Entete.css';
import { useContext } from 'react';
import { AppContext } from '../App/App';

function Entete(props) {

  const context = useContext(AppContext)
  console.log(props);
  return (
    <header>
      <NavLink to="/"><h1>Videoclub</h1></NavLink>
      <nav>
        {/* {props.estLog ? <NavLink to="/admin">Admin</NavLink> : ""}  */}
        {context.estLog ? <NavLink to="/admin">Admin</NavLink> : ""}

        <br></br>
        <NavLink to="/liste-films">Liste des Films</NavLink>
      </nav>
      <form onSubmit={props.handleLogin}>
        <input type="text" name="usager" placeholder='login'></input>
        <button>Login</button>
      </form>
    </header>
  );
}

export default Entete;
