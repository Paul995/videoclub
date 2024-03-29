import "./Stars.css";

function Stars(props) {

  const percentage = `${props.starRatio}%`;

  return (
    <div className="stars">
      <div className="gold" style={{ width: percentage }}></div>
      <div className="stars-container">
     
        <img src="/img/starstrans.png"></img>
        
      </div>
    </div>
  );
}

export default Stars;
