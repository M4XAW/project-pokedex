import React from "react";
import { useState } from "react";
import "./card.scss";

export default function Card(props) {
  const ls = localStorage;
  const [isPokemonAdded, setIsPokemonAdded] = useState(
    ls.getItem(`${props.id}`)
  );

  const isPokemonInPokedex = () => {
    return ls.getItem(`${props.id}`) !== null; // return true if the pokemon is in the pokedex
  };

  const addToLocalStorage = (pokemonData) => { // add the pokemon to the local storage
    const pokemonId = pokemonData.id;
    const isPokemonAlreadyAdded = ls.getItem(`${pokemonId}`); // check if the pokemon is already in the pokedex

    if (isPokemonAlreadyAdded === null) { // if the pokemon is not in the pokedex, add it
      ls.setItem(`${pokemonId}`, JSON.stringify(pokemonData));
      setIsPokemonAdded(true);
    }
  };

  const removeToLocalStorage = (pokemonId) => { // remove the pokemon from the local storage
    ls.removeItem(`${pokemonId}`);
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
            {props.type2 && ( // if the pokemon has a second type, display it
              <div className={`type ${props.type2}`}>{props.type2}</div>
            )}
            {props.type3 && ( // if the pokemon has a third type, display it
              <div className={`type ${props.type3}`}>{props.type3}</div>
            )}
          </div>
        </div>
      </div>
      {props.typeButton === "addButton" ? ( // if the button is an add button, display it and add the pokemon to the pokedex
        <button className="addButton" onClick={() => addToLocalStorage(props)}>
          {isPokemonInPokedex() ? "✔️" : "Ajouter +"} 
        </button>
      ) : ( // if the button is a remove button, display it and remove the pokemon from the pokedex
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
