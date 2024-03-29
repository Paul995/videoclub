import "./Commentaires.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FilmContext } from "../Film/Film";
import { useParams } from "react-router-dom";

function Commentaires(props) {
  let { id } = useParams();

  const urlFilm = `http://localhost:3301/api/films/${id}`;

  const [listeCommentaires, setListeCommentaires] = useState(
    props.commentaires
  );


  useEffect(() => {
    if (props.commentaires) {
      // pour changer seuelement dernier truc au lieu de reafficher tout les comments
      setListeCommentaires(() => [...props.commentaires]);
    }
  }, [props.commentaires]);

  //console.log(listeCommentaires);

  if (listeCommentaires) {
    return (
      <div className="coms-container">
        {listeCommentaires.map((commentaire, index) => (
          
          <div key={index} className="ind-com">
            <p className="com">
              <strong>{commentaire.commentaire}</strong>
            </p>
            <p>user: {commentaire.auteur || commentaire.usager}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="coms-container">
        <p>Il n'y a pas encore de commentaires pour ce film.</p>
      </div>
    );
  }
}

export default Commentaires;
