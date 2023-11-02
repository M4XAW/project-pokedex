import React from "react";
import { useEffect, useState } from "react";
import "./home.scss";

import Card from "../../Components/Card/card";

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
          <Card index={index} id={pokemon.id} name={pokemon.name} height={pokemon.height} weight={pokemon.weight} type1={pokemon.types[0].type.name} type2={pokemon.types[1] && pokemon.types[1].type.name} type3={pokemon.types[2] && pokemon.types[2].type.name} />
        ))}
      </div>
    </main>
  );
}
