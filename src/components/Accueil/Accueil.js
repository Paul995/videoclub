import "./Accueil.css";
import { motion } from "framer-motion";

import accueilData from "../../Accueil.json";


function Accueil() {
  /*framer-motion stuff*/
  const transition = { duration: 0.3, ease: "easeInOut" };
  const variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  return (
    /* animation framer-motion*/
    <motion.main
      key="accueil"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <div className="hero-container">
        <img src="/img/heromovies.png" className="hero" key="img"></img>
      </div>
      <div className="accueil">
        {accueilData.map((a) => (
          <p>{a}</p>
        ))}
      </div>

      {/* le contenu du fichier acceuil.json IMPORTE! du dossier Accueil*/}
    </motion.main>
  );
}

export default Accueil;
