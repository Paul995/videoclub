
import './Filtres.css';

function Filtres(props) {
   
  return (  
    <ul>
    {/* pour changer lurl au click */}
        <li onClick={props.handleFiltres}>Titre - alphabetique A-Z</li>
        <li onClick={props.handleFiltres}>Titre - alphabetique Z-A</li>
        <li onClick={props.handleFiltres}>Realisateurs - alphabetique A-Z</li>
        <li onClick={props.handleFiltres}>Realisateurs - alphabetique Z-A</li>
        <li onClick={props.handleFiltres}>Par année - alphabetique (plus r&eacute;cent)</li>
        <li onClick={props.handleFiltres}>Par année - alphabetique (plus ancien)</li>
        </ul>
  );
}

export default Filtres;
