import { useEffect, useState } from "react";
import "./pokédex.scss";

import Card from "../../Components/Card/card";

export default function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myPokemonList")) || [];
    setPokemonList(storedData);
  }, []);

  return (
    <div>
      <h1>Liste de mes Pokémon</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon.name}{pokemon.height}</li>
        ))}
      </ul>
    </div>
  );
}
