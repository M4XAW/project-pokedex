import React from "react";
import "./card.scss";

export default function Card(props) {
  const addToLocalStorage = (pokemonData) => {
    const pokemonId = pokemonData.id;
    const isPokemonAlreadyAdded = localStorage.getItem(`${pokemonId}`);
    
    if (!isPokemonAlreadyAdded) {
      localStorage.setItem(`${pokemonId}`, JSON.stringify(pokemonData));
      alert("Pokémon ajouté avec succès !");
    } else {
      alert("Ce Pokémon est déjà dans votre liste.");
    }
  };

  return (
    <div key={props.index} className="card">
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
        />
        <div className="cardContent">
          <p>N° {props.id}</p>
          <h2>{props.name}</h2>
          <p>{props.height}</p>
          <p>{props.weight}</p>
          <p>{props.type1}</p>
          {props.type2 && <p>{props.type2}</p>}
          {props.type3 && <p>{props.type3}</p>}
        </div>
      </div>
      <button className="addButton" onClick={() => addToLocalStorage(props)}>
        Ajouter
      </button>
    </div>
  );
}
