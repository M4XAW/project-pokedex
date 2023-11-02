import React from "react";
import { useState } from "react";
import "./card.scss";


export default function Card(props) {
  const ls = localStorage;
  const [isPokemonAdded, setIsPokemonAdded] = useState(ls.getItem(`${props.id}`));

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
  }

  return (
    <div key={props.index} className="card">
      <p className="number">{props.id}</p>
      <div className="cardContent">
        <img
          className="pokemonImage"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
        />
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
          {/* <p className="pokemonInfos">{props.type1}</p>
          {props.type2 && <p className="pokemonInfos">{props.type2}</p>}
          {props.type3 && <p className="pokemonInfos">{props.type3}</p>} */}
        </div>
      </div>
      {props.typeButton === "addButton" ? (
        <button className="addButton" onClick={() => addToLocalStorage(props)}>
          {isPokemonAdded ? '✔️' : 'Ajouter +'}
        </button>
      ) : (
        <button className="removeButton" onClick={() => removeToLocalStorage(props.id)}>
          Supprimer
        </button>
      )}
    </div>
  );
}
