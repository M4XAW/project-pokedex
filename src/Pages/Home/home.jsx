import React from "react";
import { useEffect, useState } from "react";
import "./home.scss";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((pokemon) => fetch(pokemon.url));
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((pokemonData) => setPokemon(pokemonData))
          .catch((error) => console.error("Error:", error));
      });
  }, []);

  return (
    <main className="home">
      <input type="text" placeholder="Rechercher" />
      <div className="cards">
        {pokemon.map((pokemon, index) => (
          <div key={index} className="card">
            <div className="cardImage">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="cardContent">
              <p>N° {pokemon.id}</p>
              <h2>{pokemon.name}</h2>
              <p>{pokemon.height}</p>
              <p>{pokemon.weight}</p>
              <p>{pokemon.types[0].type.name}</p>
              {pokemon.types[1] && <p>{pokemon.types[1].type.name}</p>}
              {pokemon.types[2] && <p>{pokemon.types[2].type.name}</p>}
            </div>
            <button>Ajouter</button>
          </div>
        ))}
      </div>
    </main>
  );
}
