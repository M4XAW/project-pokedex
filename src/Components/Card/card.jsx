import React from "react";
import { useState } from "react";
import "./card.scss";

import Popup from "../PopUp/popup";

export default function Card(props) {
  const ls = localStorage;
  const [isPokemonAdded, setIsPokemonAdded] = useState(
    ls.getItem(`${props.id}`)
  );
  const [showPopup, setShowPopup] = useState(false);

  const addToLocalStorage = (pokemonData) => {
    const pokemonId = pokemonData.id;
    const isPokemonAlreadyAdded = ls.getItem(`${pokemonId}`);

    if (!isPokemonAlreadyAdded) {
      ls.setItem(`${pokemonId}`, JSON.stringify(pokemonData));
      setIsPokemonAdded(true);
    }
  };

  const removeToLocalStorage = (pokemonId) => {
    ls.removeItem(`${pokemonId}`);
    setIsPokemonAdded(false);
    window.location.reload();
  };

  return (
    <div key={props.index} className="card">
      <p className="number">{props.id}</p>
      <div className="cardContent">
        <div className="pokemonImage">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="cardInfos">
          <h2 className="pokemonName">{props.name}</h2>
          <div className="types">
            <div className={`type ${props.type1}`}>{props.type1}</div>
            {props.type2 && (
              <div className={`type ${props.type2}`}>{props.type2}</div>
            )}
            {props.type3 && (
              <div className={`type ${props.type3}`}>{props.type3}</div>
            )}
          </div>
        </div>
      </div>
      {props.typeButton === "addButton" ? (
        <button className="addButton" onClick={() => addToLocalStorage(props)}>
          {isPokemonAdded ? "✔️" : "Ajouter +"}
        </button>
      ) : (
        <button
          className="removeButton"
          onClick={() => removeToLocalStorage(props.id)}
        >
          Supprimer
        </button>
      )}
    </div>
  );
}
