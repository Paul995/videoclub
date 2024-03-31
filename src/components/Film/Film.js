import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App/App";
import "./Film.css";
import Commentaires from "../Commentaires/Commentaires";

import * as React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import Stars from "../Stars/Stars";



export const FilmContext = React.createContext();

function Film() {

  const navigate = useNavigate();
  let context = useContext(AppContext);

  // Get the userId param from the URL.
  let { id } = useParams();
  //console.log(id);

  //const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;
  const urlFilm = `http://localhost:3301/api/films/${id}`
  const [film, setFilm] = useState([]);
  const [moyenne, setMoyenne] = useState("");



  useEffect(() => {
    fetch(urlFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilm(data);


//Pour nettoyer les trucs non valides que quelquun aurait mit dans le array notes sur render!!!!!!
        let notes = Array.isArray(data.notes) ? data.notes : [];
   
        let filteredNotes = notes.filter(element => !(typeof element === 'string' || (typeof element === 'number' && element > 5 || element == 0 )));
       
        setFilm(prevFilm => ({ ...prevFilm, notes: filteredNotes }));

        // console.log(filteredNotes);

        if (notes.length !== filteredNotes.length) {

          const oOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ notes: filteredNotes }),
          };


     
          fetch(urlFilm, oOptions)
            .then(response => response.json())
            .then(updatedFilm => {
              console.log('Notes updated', updatedFilm);
            
            }).catch(error => {
           
              console.error('Erreur:', error);
          
            });
        }



// POUR MOYENNE
        if (notes && notes.length > 0) {
            //moyenne
            let aDataNotes = notes;
            const sum = aDataNotes.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
  
            const moyenne = (sum / aDataNotes.length).toFixed(2);
  
            setMoyenne(moyenne)
 
        }
      }).catch((erreur)=>{
        console.log(erreur);
      })
  }, []);






  // // react eccoute si il y a un changement detat, mais pas etatTest
  // useEffect(() => {
  //   // useEffect est juste quand il y a CHANGEMENT
  //   //  console.log("rendu");
  //   fetch(urlFilm)
  //     .then((reponse) => reponse.json())
  //     .then((data) => {
  //       setFilm(data);

  //       //nettoyer array notes
  //       let aNotesNum = [];
  //       aNotesNum.push(data.notes);
  //       console.log(aNotesNum[0]);

  //       function filtered(arr) {
  //         return arr.filter(element => !(typeof element == 'string' || (typeof element == 'number' && element > 5)));
  //       }

  //       const filteredArr = filtered(aNotesNum[0])
  //       console.log(filteredArr);

  //       //  console.log(data.notes.length);
  //       if (data.notes && data.notes.length > 0) {
  //         //moyenne
  //         let aDataNotes = data.notes;
  //         const sum = aDataNotes.reduce(
  //           (accumulator, currentValue) => accumulator + currentValue,
  //           0
  //         );

  //         const moyenne = (sum / aDataNotes.length).toFixed(2);

  //         setMoyenne(moyenne)

  //       }
  //     });
  // }, []); //une seule fois lors du premier rendu quand on met un [] ici. sinon la var dans le [] est ce qui est ecoute pour changer

  /* STAR STUFF */
  let starRatio = moyenne * 2 * 10;
  

  async function soumettreNote(e) {
    let vote = Number(e.target.textContent);

    let aNotes;

    if (!film.notes) {
      aNotes = [];
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
  if (context.estLog) {
    blockAjoutCommentaire = (
      <form id="form-com" onSubmit={soumettreCommentaire}>
        <textarea
          id="commentaire"
          placeholder="Ajouter votre commentaire"
        ></textarea>
        <br></br>
        <button>Soumettre</button>
      </form>
    );
  }

  console.log(context);
  async function soumettreCommentaire(e) {
    e.preventDefault();

    const commentaire = document.querySelector("#commentaire").value;

    let aCommentaires;

    if (!film.commentaires) {
      aCommentaires = [{ commentaire: commentaire, usager: context.usager }];
    } else {
      aCommentaires = film.commentaires;
      aCommentaires.push({ commentaire: commentaire, usager: context.usager });
    }

    document.getElementById("commentaire").value = "";


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

  ////////// DELETE
let btnDelete;
// console.log(context);
if (context.estLog) {
  btnDelete = <button onClick={deleteFilm}>Supprimer le film</button>;
}

async function deleteFilm() {

  // Vous pouvez ajouter des confirmations ou des vérifications supplémentaires ici
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
  if (!confirmDelete) {
    return;
  }

  const url = `http://localhost:3301/api/films/${id}`; 
console.log(url);
 
 const token = localStorage.getItem('API-films'); 


 console.log(token);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (response.status === 401) { // Si non autorisé (token expiré)
      // Option 1: Tenter de rafraîchir le token ici
      // Option 2: Demander à l'utilisateur de se reconnecter
      alert("Session expirée, veuillez vous reconnecter.");
      window.location.href = '/';
      return;
  }

   
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du film');
    }
   
    alert('Film supprimé avec succès');
  
    navigate('/liste-films'); 

  } catch (error) {
    alert('Une erreur est survenue lors de la suppression du film.');
  }
}



console.log(film.commentaires);

  return (
    <main>
      <div className="film-container">
        <img
          src={`/img/${film?.titreVignette}`}
          alt={film?.titre}
          className="imgSingle"
        />
        <h1 id="titre-film">{film?.titre}</h1>
        <p>{film?.realisation}</p>
        <p>{film?.annee}</p>
        <p>{film?.description}</p>

        <p>
          {" "}
          <span>Notez ce film! : </span>
          <button onClick={soumettreNote}>1</button>
          <button onClick={soumettreNote}>2</button>
          <button onClick={soumettreNote}>3</button>
          <button onClick={soumettreNote}>4</button>
          <button onClick={soumettreNote}>5</button>
          {moyenne ? (
            <div className="notes-container">
              <span className="moyenne">{moyenne}/5</span>
              <Stars starRatio={starRatio} className="stars" />
            </div>
          ) : (
            <div className="aucune-note">
              <p>Aucune note pour ce film</p>
            </div>
          )}
        </p>
        {btnDelete}
        {blockAjoutCommentaire}
      </div>
      <Commentaires commentaires={film?.commentaires} />
    </main>
  );
}

export default Film;
