import { useEffect, useState, useContext } from "react";
import { AppContext } from '../App/App';
import "./Film.css";
import Commentaires from "../Commentaires/Commentaires";

import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";

export const FilmContext = React.createContext();

function Film() {

  let context = useContext(AppContext);

  // Get the userId param from the URL.
  let { id } = useParams();
  //console.log(id);

  const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;
  const [film, setFilm] = useState([]);
  const [moyenne, setMoyenne] = useState("");





  //console.log("rendu");
  // react eccoute si il y a un changement detat, mais pas etatTest
  useEffect(() => {
    // useEffect est juste quand il y a CHANGEMENT
    //  console.log("rendu");
    fetch(urlFilm)
      .then((reponse) => reponse.json())
      .then((data) => {
        setFilm(data);
        
      //  console.log(data.notes.length);
        if(data.notes && data.notes.length > 1){

           //moyenne
          let aDataNotes = data.notes;
          const sum = aDataNotes.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          const moyenne = (sum / aDataNotes.length).toFixed(2);

          setMoyenne(moyenne);
        }
       
      });
  }, []); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer

  async function soumettreNote(e) {
    let vote = Number(e.target.textContent);

    let aNotes;

    if (!film.notes) {
      aNotes = [1];
    } else {
      aNotes = film.notes;
      aNotes.push(vote);

      //moyenne
      const sum = aNotes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const newMoyenne = (sum / aNotes.length).toFixed(2);

      setMoyenne(newMoyenne); // Update moyenne state
      // console.log("sum : " + sum);
      // console.log("moyenne : " + moyenne);
    }

    //options de la requete
    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: aNotes }), // rajoute note dans lobj dans database
    };

    //pour eviter le callback hell
    let putNote = await fetch(urlFilm, oOptions);
    let getFilm = await fetch(urlFilm);

    Promise.all([putNote, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        // console.log(data);
      });

    //evoyer au serveur
    fetch(urlFilm, oOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      });
  }







  //comentaires

  let blockAjoutCommentaire;
  // console.log(context);
  if(context.estLog){
    blockAjoutCommentaire = <form id="form-com" onSubmit={soumettreCommentaire}>
                              <textarea id="commentaire" placeholder="Ajouter votre commentaire"></textarea><br></br>
                              <button>Soumettre</button>
                            </form>
  }



  async function soumettreCommentaire(e) {

    e.preventDefault();

    const commentaire = document.querySelector('#commentaire').value;


    let aCommentaires;

    if (!film.commentaires) {
      aCommentaires = [{commentaire: commentaire, usager: context.usager}];
    } else {
      aCommentaires = film.commentaires;
      aCommentaires.push({commentaire: commentaire, usager: context.usager});
    }

    // //options de la requete
    //appelAsync({})
    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaires: aCommentaires }), // rajoute note dans lobj dans database
    };

    // //pour eviter le callback hell
    let putCommentaire = await fetch(urlFilm, oOptions);
    let getFilm = await fetch(urlFilm);

    Promise.all([putCommentaire, getFilm])
      .then((response) => response[1].json())
      .then((data) => {
        // console.log(data);
        setFilm(data);
      });


  }


  return (
    <main>
      <img
        src={`/img/${film?.titreVignette}`}
        alt={film?.titre}
        className="imgSingle"
      />
      <h2>{film?.titre}</h2>
      <p>{film?.realisation}</p>
      <p>{film?.annee}</p>
      <p>{film?.description}</p>
      <div>
        <button onClick={soumettreNote}>1</button>
        <button onClick={soumettreNote}>2</button>
        <button onClick={soumettreNote}>3</button>
        <button onClick={soumettreNote}>4</button>
        <button onClick={soumettreNote}>5</button>
      </div>
      {
      moyenne
        ? <p>Moyenne : {moyenne}</p>
        : <p>Aucun votes pour ce film</p> // Replace "Moyenne non disponible" with your custom message
    }
    {blockAjoutCommentaire}

    <Commentaires /> 
    
    </main>
  );
  }

export default Film;
