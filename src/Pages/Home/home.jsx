import React from "react";
import { useEffect, useState } from "react";
import "./home.scss";

import Card from "../../Components/Card/card";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="home">
      <input
        type="text"
        placeholder="Rechercher"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="cards">
        {searchTerm && !filteredPokemon.length && <p>Aucun résultat</p>}

        {filteredPokemon.map((pokemon, index) => (
          <Card
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            height={pokemon.height}
            weight={pokemon.weight}
            type1={pokemon.types[0].type.name}
            type2={pokemon.types[1] && pokemon.types[1].type.name}
            type3={pokemon.types[2] && pokemon.types[2].type.name}
          />
        ))}

        {!searchTerm &&
          pokemon.map((pokemon, index) => (
            <Card
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              height={pokemon.height}
              weight={pokemon.weight}
              type1={pokemon.types[0].type.name}
              type2={pokemon.types[1] && pokemon.types[1].type.name}
              type3={pokemon.types[2] && pokemon.types[2].type.name}
            />
          ))}
      </div>
    </main>
  );
}
