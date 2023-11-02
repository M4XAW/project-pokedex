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
      <p className="number">{props.id}</p>
      <div className="cardContent">
        <img
          className="pokemonImage"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
        />
        <div className="cardInfos">
          <h2 className="pokemonName">{props.name}</h2>
          <p className="pokemonInfos">{props.height}</p>
          <p className="pokemonInfos">{props.weight}</p>
          <p className="pokemonInfos">{props.type1}</p>
          {props.type2 && <p className="pokemonInfos">{props.type2}</p>}
          {props.type3 && <p className="pokemonInfos">{props.type3}</p>}
        </div>
      </div>
      <button className="addButton" onClick={() => addToLocalStorage(props)}>
        Ajouter +
      </button>
    </div>
  );
}
