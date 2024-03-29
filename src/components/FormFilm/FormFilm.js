import "./FormFilm.css";
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
    } else {
      const messageErreur = res.erreur;
      console.log("erreur ", messageErreur);
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
          {/* <div className="input genres">
                        <label htmlFor="genres">Genres :</label>
                        <div>
                            <input type="checkbox" id="action" name="genresAction" value="Action" onChange={onFormDataChange} />
                            <label htmlFor="action">Action</label>
                        </div>
                        <div>
                            <input type="checkbox" id="aventure" name="genresAventure" value="Aventure" onChange={onFormDataChange} />
                            <label htmlFor="aventure">Aventure</label>
                        </div>
                        <div>
                            <input type="checkbox" id="animation" name="genresAnimation" value="Animation" onChange={onFormDataChange} />
                            <label htmlFor="animation">Animation</label>
                        </div>
                        <div>
                            <input type="checkbox" id="comedie" name="genresComedie" value="Comédie" onChange={onFormDataChange} />
                            <label htmlFor="comedie">Comédie</label>
                        </div>
                        <div>
                            <input type="checkbox" id="crime" name="genresCrime" value="Crime" onChange={onFormDataChange} />
                            <label htmlFor="crime">Crime</label>
                        </div>
                        <div>
                            <input type="checkbox" id="drame" name="genresDrame" value="Drame" onChange={onFormDataChange} />
                            <label htmlFor="drame">Drame</label>
                        </div>
                        <div>
                            <input type="checkbox" id="famille" name="genresFamille" value="Famille" onChange={onFormDataChange} />
                            <label htmlFor="famille">Famille</label>
                        </div>
                        <div>
                            <input type="checkbox" id="fantaisie" name="genresFantaisie" value="Fantaisie" onChange={onFormDataChange} />
                            <label htmlFor="fantaisie">Fantaisie</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horreur" name="genresHorreur" value="Horreur" onChange={onFormDataChange} />
                            <label htmlFor="horreur">Horreur</label>
                        </div>
                        <div>
                            <input type="checkbox" id="musical" name="genresMusical" value="Musical" onChange={onFormDataChange} />
                            <label htmlFor="musical">Musical</label>
                        </div>
                        <div>
                            <input type="checkbox" id="mystere" name="genresMystere" value="Mystère" onChange={onFormDataChange} />
                            <label htmlFor="mystere">Mystère</label>
                        </div>
                        <div>
                            <input type="checkbox" id="scienceFiction" name="genresScienceFiction" value="Science-Fiction" onChange={onFormDataChange} />
                            <label htmlFor="scienceFiction">Science-Fiction</label>
                        </div>
                        <div>
                            <input type="checkbox" id="thriller" name="genresThriller" value="Thriller" onChange={onFormDataChange} />
                            <label htmlFor="thriller">Thriller</label>
                        </div>
                    </div> */}
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
