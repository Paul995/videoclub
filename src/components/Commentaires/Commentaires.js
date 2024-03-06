
import './Commentaires.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FilmContext } from '../Film/Film';
import { useParams } from 'react-router-dom';

function Commentaires() {

  

    let { id } = useParams();

    const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`;

   
    const [listeCommentaires, setListeCommentaires] = useState([]);


    useEffect(() => {
     
        fetch(urlFilm)
          .then((reponse) => reponse.json())
          .then((data) => {
            setListeCommentaires(data);

            if (data.commentaires) {
                setListeCommentaires(data.commentaires);
                   
              console.log(listeCommentaires);
               
                }else{
                  setListeCommentaires([])
                };
      
          });
      }, []);


 if(listeCommentaires.length > 0){
      return(
       
        <div className='coms-container'>
           {listeCommentaires.map((commentaire, index) => (
                  <div key={index} className='ind-com'>
                      <p className='com'>
                        <strong>{commentaire.commentaire}</strong>
                    </p>
                    <p>
                      user: {commentaire.auteur || commentaire.usager}
                    </p>
                  </div>
                ))}
        </div>
          
      );
 }else{
  return(
    <div className='coms-container'>
      <p>Il n'y a pas encore de commentaires pour ce film.</p>
    </div>
  )
 }
   
}

export default Commentaires;
