import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TuileFilm from "../TuileFilm/TuileFilm";
import Film from "../Film/Film";
import "./ListeFilms.css";
import Filtres from "../Filtres/Filtres"

function ListeFilms() {
  // const [etat, setEtat] = useState(true);
  // const [etatTest, setEtatTest] = useState(true);

  // const listeFilms = [
  //   { titre: "Film1", realisateur: "billy", annee: 2020 },
  //   { titre: "Film2", realisateur: "b", annee: 2022 },
  //   { titre: "Film3", realisateur: "bilsddfsdfsy", annee: 2001 },
  // ];

  const urlListeFilms = "https://four1f-node-api.onrender.com/films";
  //const urlListeFilms = "data/titre-asc.json";
  const [urlFiltre, setUrlFiltre] = useState([urlListeFilms]);
  const [listeFilms, setListeFilms] = useState([]);

  //console.log("rendu");
  // react eccoute si il y a un changement detat, mais pas etatTest
  useEffect(() => {
    // useEffect est juste quand il y a CHANGEMENT
  //  console.log("rendu");
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        setListeFilms(data);
     //   console.log(data);
      });
  }, [urlFiltre]); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer
  // on peut passer dans ce array les variable pour ecoutee, dans ce cas urlFiltre change

  const tuilesFilm = listeFilms.map((film, index) => {
    return <Link to={`/film/${film.id}`} key={index}><TuileFilm data={film} /></Link>  //bon de mettre lindex comme key car jamais la meme valeure
  });


  //creer fctn filtre pour avoir une seule fonction pour tous les filtres
  function filtre(e){

    let urls = [ 'titre-asc', 'titre-desc', 'realisation-asc', 'realisation-desc', 'annee-desc', 'annee-asc'];

    for (let i = 0; i < e.target.parentNode.children.length; i++) {
  
      if(e.target == e.target.parentNode.children[i]){
        setUrlFiltre(`data/${urls[i]}.json`)
        //setUrlFiltre(`${urlListeFilms}?orderBy=realisation&orderDirection=asc`)
      }

    }
    
  }




  return (     
    <main>
      {/* <button onClick={() => setEtat(!etat)}>change etat</button>
      <p>{JSON.stringify(etat)}</p>

      <button onClick={() => setEtatTest(!etatTest)}>change etat test</button>
      <p>{JSON.stringify(etatTest)}</p> */}

        {/* props        fctn */}
      <Filtres handleFiltres={filtre} />

      <h2>Liste des films</h2>
      <div className="tuiles-container">
        {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilms;
