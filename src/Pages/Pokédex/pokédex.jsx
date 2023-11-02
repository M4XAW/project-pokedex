import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/card";
import "./pokédex.scss";

export default function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filterId] = useState("");
  const [filterName] = useState("");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const storedData = Object.values(localStorage)
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null);
    setPokemonList(storedData);
  }, []);

  const sortPokemonById = () => {
    const sortedList = [...pokemonList].sort((a, b) => a.id - b.id);
    setPokemonList(sortedList);
    setSortBy("id");
  };

  const sortPokemonByName = () => {
    const sortedList = [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPokemonList(sortedList);
    setSortBy("name");
  };

  useEffect(() => {
    if (sortBy === "id") {
      sortPokemonById();
    } else if (sortBy === "name") {
      sortPokemonByName();
    }
  }, [sortBy]);

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return (
      (!filterId || pokemon.id.includes(filterId)) &&
      (!filterName ||
        pokemon.name.toLowerCase().includes(filterName.toLowerCase()))
    );
  });

  return (
    <div className="pokédex">
      <div className="filter">
        <h1>Liste de mes Pokémon</h1>
        <div className="btn">
          <button onClick={sortPokemonById}>Trier par ID</button>
          <button onClick={sortPokemonByName}>Trier par nom</button>
        </div>
      </div>
      <div className="cards">
        {filteredPokemonList.map((pokemon, index) => (
          <Card
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            type1={pokemon.type1}
            type2={pokemon.type2}
            type3={pokemon.type3}
          />
        ))}
      </div>
    </div>
  );
}
