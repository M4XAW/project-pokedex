import React from "react";
import "./card.scss";

export default function Card(props) {
  const ls = localStorage;
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

  const removeToLocalStorage = (pokemonId) => {
    localStorage.removeItem(`${pokemonId}`);
    alert("Pokémon supprimé avec succès !");
    window.location.reload();
  };

  return (
    <div key={props.index} className="card">
      <p className="number">N° {props.id}</p>
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
        />
        <div className="cardContent">
          <h2>{props.name}</h2>
          <p>{props.height}</p>
          <p>{props.weight}</p>
          <p>{props.type1}</p>
          {props.type2 && <p>{props.type2}</p>}
          {props.type3 && <p>{props.type3}</p>}
        </div>
      </div>
      {props.typeButton === "addButton" ? (
        <button onClick={() => addToLocalStorage(props)}>Ajouter</button>
      ) : (
        <button onClick={() => removeToLocalStorage(props.id)}>
          Supprimer
        </button>
      )}
    </div>
  );
}
