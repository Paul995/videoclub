
import './TuileFilm.css';

function TuileFilm(props) {
   
  return (  
      <article className="tuile-film">
        <img src={`img/${props.data.titreVignette}`} alt={props.data.titre} />
        <div className='info'>
          <h2>{props.data.titre}</h2>
          {/* <p>{props.data.realisation}</p>
          <p>{props.data.annee}</p> */}
        </div>
      </article>
  );
}

export default TuileFilm;
