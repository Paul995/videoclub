import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TuileFilm from "../TuileFilm/TuileFilm";
import Film from "../Film/Film";
import "./ListeFilms.css";
import Filtres from "../Filtres/Filtres";

import { motion } from "framer-motion";

function ListeFilms() {
  /*motion framer shit pour wait load*/
  const [estCharge, setEstCharge] = useState(false);

  // const [etat, setEtat] = useState(true);
  // const [etatTest, setEtatTest] = useState(true);

  // const listeFilms = [
  //   { titre: "Film1", realisateur: "billy", annee: 2020 },
  //   { titre: "Film2", realisateur: "b", annee: 2022 },
  //   { titre: "Film3", realisateur: "bilsddfsdfsy", annee: 2001 },
  // ];

  //const urlListeFilms = "https://four1f-node-api.onrender.com/films";
  //const urlListeFilms = "data/titre-asc.json";
  const urlListeFilms = "http://localhost:3301/api/films";
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
        console.log(data);

        setEstCharge(true); //pour le wait du animation framer
      });
  }, [urlFiltre]); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer
  // on peut passer dans ce array les variable pour ecoutee, dans ce cas urlFiltre change

  const tuileFilm = listeFilms.map((film, index) => {
    return (
      <Link to={`/film/${film.id}`} key={index}>
        <TuileFilm data={film} />
      </Link>
    ); //bon de mettre lindex comme key car jamais la meme valeure
  });

  // console.log(tuileFilm);

  //creer fctn filtre pour avoir une seule fonction pour tous les filtres
  // function filtre(e) {
  //   let urls = [
  //     "titre-asc",
  //     "titre-desc",
  //     "realisation-asc",
  //     "realisation-desc",
  //     "annee-desc",
  //     "annee-asc",
  //   ];

  //   for (let i = 0; i < e.target.children.length; i++) {
  //     if (e.target.value == e.target.children[i].value) {
  //       console.log(e.target.children[i].value);
  //       console.log(urls[i-1]);
  //       setUrlFiltre(`data/${urls[i-1]}.json`);
  //       console.log(urlFiltre);
  //     }
  //   }
  // }

  // function filtre(e) {
  //   // Récupérer la valeur sélectionnée pour le filtrage
  //   const valeurFiltre = e.target.value;

  //   // Construire l'URL avec le paramètre de filtrage
  //   const urlAvecFiltre = `${urlListeFilms}?tri=${valeurFiltre}`;

  //   // Envoyer une requête pour récupérer les films filtrés
  //   fetch(urlAvecFiltre)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Mettre à jour l'état avec la liste des films filtrés
  //       setListeFilms(data);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des films filtrés:', error);
  //     });
  // }

  async function filtre(e) {
    e.preventDefault();

    const valeurFiltre = e.target.value;
    const [champ, ordre] = valeurFiltre.split("-");

    const urlAvecFiltre = `http://localhost:3301/api/films?tri=${champ}&order-direction=${ordre}`;

    try {
      const response = await fetch(urlAvecFiltre);

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const filmsFiltres = await response.json();

      setListeFilms(filmsFiltres);
    } catch (error) {
      console.error("Erreur de filtres", error);
    }
  }

  /*framer-motion stuff*/
  const transition = { duration: 0.3, ease: "easeInOut" };
  const variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  return (
    <main>
      {/* <button onClick={() => setEtat(!etat)}>change etat</button>
      <p>{JSON.stringify(etat)}</p>

      <button onClick={() => setEtatTest(!etatTest)}>change etat test</button>
      <p>{JSON.stringify(etatTest)}</p> */}
      {estCharge ? (
        <motion.div
          key="filtres"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0, transition }}
          exit={{ opacity: 0, x: -25, transition }}
          className="filtres"
        >
          <Filtres handleFiltres={filtre} />
        </motion.div>
      ) : (
        ""
      )}
      {/* ce conditionnel fait que lanimation load bien */}
      {estCharge ? (
        <motion.div
          key="liste"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className="tuiles-container"
        >
          {tuileFilm}
        </motion.div>
      ) : (
        ""
      )}
      ;
    </main>
  );
}

export default ListeFilms;
