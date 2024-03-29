
import './TuileFilm.css';

function TuileFilm(props) {
   
  return (  
      <article className="tuile-film">
        <img src={`img/${props.data.titreVignette}`} alt={props.data.titre} />

      </article>
  );
}

export default TuileFilm;
