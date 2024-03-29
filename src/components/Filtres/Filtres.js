
import './Filtres.css';

function Filtres(props) {



   
  return (  
    <div className='select-wrapper'>
       <select id='filtres' onChange={props.handleFiltres}>
      <option disabled selected>-- Filtres --</option>
      <option value="titre-asc">Titre - alphabétique A-Z</option>
      <option value="titre-desc">Titre - alphabétique Z-A</option>
      <option value="realisation-asc">Réalisateurs - alphabétique A-Z</option>
      <option value="realisation-desc">Réalisateurs - alphabétique Z-A</option>
      <option value="annee-desc">Par année - le plus récent</option>
      <option value="annee-asc">Par année - le plus ancien</option>
    </select>
    </div>
  );
}

export default Filtres;
