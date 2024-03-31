import "./FormFilm.css";
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormFilm() {
  const genres = [
    "Action",
    "Aventure",
    "Comédie",
    "Drame",
    "Fantaisie",
    "Horreur",
    "Policier",
    "Science-Fiction",
    "Thriller",
    "Western",
  ];

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    realisation: "",
    annee: "",
    genres: [],
    titreVignette: "vide.jpg",
  });

  const [formValidity, setFormValidity] = useState("invalid");

  const navigate = useNavigate();


  // fctn qui update lobj FormData au click du changement de champs form
  function onFormDataChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // const (name, value) = e.target;  sameshit


    //GENRES
    if (name.startsWith("genre")) {
      const estCoche = e.target.checked;
      let genres = formData.genres || [];
      
      
     
      //si on decoche, on enleve
      if (!estCoche && genres.includes(value)) {
        genres = genres.filter((el, index) => {
              
          //comme map, mais return ce qui est true dans le array
          return (el !== value); //exclu le value du nouveau tableau
        });
      } else if (estCoche && !genres.includes(value)) {
        genres.push(value);
      }

      const donneesModifiee = { ...formData, genres };
      setFormData(donneesModifiee);
      console.log(donneesModifiee);

    } else if(name == 'titreVignette'){
        const nomFichier = e.target.files[0].name;
        const donneesModifiee = { ...formData, titreVignette: nomFichier };
        setFormData(donneesModifiee)
        console.log(donneesModifiee);
    }else {
      //   clone FormData et modifie un champ / new donnee (ecrase name avec la value, de lobj FomData)
      const donneesModifiee = { ...formData, [name]: value };

      const estValide = e.target.form.checkValidity() ? "valid" : "invalid";
      setFormValidity(estValide);
      //met a jour donnees globales
      setFormData(donneesModifiee);
    }
  }


  //                      e obligatoire
  async function onFormSubmit(e) {
    e.preventDefault(); // empeche le submit par defaut pour customizer
    // verifier si valid
    if (formValidity == "invalid") {
      //afficher message erreur
      e.target.reportValidity();
      return;
    }


    //prepare la donnee
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("api-films")}`,
      },
      body: JSON.stringify(formData),
    };
    //recupere le token
    // submit
    const req = await fetch("http://localhost:3301/api/films", data);
    const res = await req.json();

    console.log(req.status);
    //gere le reponse du form
    if (req.status === 200) {
      //afficher un message de success
      console.log("sucesssss");
      //vider le form
      setFormData({
        titre: "",
        description: "",
        realisation: "",
        annee: "",
        genres: [],
        titreVignette: "vide.jpg",
      });
    
      //reset etat de la validite
      setFormValidity("invalid");
      navigate('/liste-films'); 
    } else {
      const messageErreur = res.erreur;
      console.log("erreur ", messageErreur);
        
        navigate('/liste-films'); 
    }
  }

  
  return (
    <main>
      <div className="wrapper">
        <h1>Ajouter un Film</h1>
        <form className={formValidity} onSubmit={onFormSubmit}>
          <div className="input">
            <label htmlFor="titre">Titre : </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={onFormDataChange}
              required
              minLength={1}
              maxLength={120}
            ></input>
          </div>
          <div className="input">
            <label htmlFor="description">Description : </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={onFormDataChange}
              required
              minLength={1}
              maxLength={500}
            ></textarea>
          </div>
          <div className="input">
            <label htmlFor="realisation">Realisation : </label>
            <input
              type="text"
              id="realisation"
              name="realisation"
              value={formData.realisation}
              onChange={onFormDataChange}
            ></input>
          </div>
          <div className="input">
            <label htmlFor="annee">Annee : </label>
            <input
              type="text"
              id="annee"
              name="annee"
              value={formData.annee}
              onChange={onFormDataChange}
            ></input>
          </div>
          <div className="input">
            <label htmlFor="titreVignette">Image : </label>
            <input
              type="text"
              id="titreVignette"
              name="titreVignette"
              value={formData.titreVignette}
              onChange={onFormDataChange}
            ></input>
          </div>
          <div className="input">
            <p>Genres : </p>
            {genres.map((el, index) => {
              return (
                <div key={index} className="genres">
                  <input
                    type="checkbox"
                    id={el}
                    name={`genre-${el}`}
                    value={el}
                    onChange={onFormDataChange}
                    checked={formData.genres.includes(el)}
                  />

                  <label htmlFor={el}>{el}</label>
                </div>
              );
            })}
          </div>
          <div className="input">
            <label htmlFor="titreVignette">Vignette : </label>
            <input type="file" name="titreVignette" id="titreVignette" accept=".jpg,.jpeg,.png,.webp" onChange={onFormDataChange} />
          </div>
          <input
            type="submit"
            value="Envoyer"
            disabled={formValidity == "invalid" ? "disabled" : ""}
          ></input>
        </form>
        {/* {
                    messageErreur !== "" ? <div className="err">{messageErreur}<div/> : <div></div>;
                } */}
      </div>
    </main>
  );
}

export default FormFilm;
