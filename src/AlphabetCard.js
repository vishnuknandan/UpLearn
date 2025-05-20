// AlphabetCard.js
import React from "react";
import "./AlphabetCard.css";

const AlphabetCard = ({ imageSrc, letter, onClick }) => {
  return (
    <button className="alphabet-card" onClick={onClick}>
      <img src={imageSrc} alt={letter} className="card-image" />
      {/* <div className="card-letter">{letter}</div> */}
    </button>
  );
};

export default AlphabetCard;
