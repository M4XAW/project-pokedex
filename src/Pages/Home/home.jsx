import React from "react";
import { useEffect, useState } from "react";
import "./home.scss";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/10", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
    <div>
        <h1>Home</h1>
        <h2>{pokemon.name}</h2>
        {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <img src={pokemon.sprites.front_shiny} alt={pokemon.name} /> */}
        <h2>{pokemon.height}</h2>
        <h2>{pokemon.weight}</h2>
    </div>
  )
}
