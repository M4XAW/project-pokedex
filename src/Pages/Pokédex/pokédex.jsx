import React, { useEffect, useState } from "react";
import Card from '../../Components/Card/card'

export default function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const storedData = Object.values(localStorage)
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error("Erreur de parsing JSON : ", error);
          return null;
        }
      })
      .filter((item) => item !== null);
    setPokemonList(storedData);
  }, []);
  

  return (
    <div>
      <h1>Liste de mes Pokémon</h1>
      <div className="cards">
      {pokemonList.map((pokemon, index) => (
        <Card
          key={index}
          id={pokemon.id}
          name={pokemon.name}
          height={pokemon.height}
          weight={pokemon.weight}
        />
      ))}
      </div>
    </div>
  );
}
