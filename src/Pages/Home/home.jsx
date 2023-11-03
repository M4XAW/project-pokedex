import React from "react";
import { useEffect, useState } from "react";// Import necessary dependencies
import "./home.scss";// Import the styles for the home component

import Card from "../../Components/Card/card";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);// Initialize state for storing Pokémon data
  const [searchTerm, setSearchTerm] = useState("");// Initialize state for the search term
  const [offset, setOffset] = useState(0);
  const limit = 30;

  // Function to load Pokémon data with a new offset
  const loadPokemon = (newOffset) => {
    setOffset(newOffset);
  };

  // Function to load the next page of Pokémon
  const loadNextPage = () => {
    if (pokemon.length === limit) {
      const newOffset = offset + limit;
      loadPokemon(newOffset);
    }
  };
  
  // Function to load the previous page of Pokémo
  const loadPreviousPage = () => {
    const newOffset = Math.max(0, offset - limit);
    loadPokemon(newOffset);
  };

  useEffect(() => {
    // Change the title of the page
    document.title = "Tous les Pokémons";
  });

  useEffect(() => {
    // fetch data from API
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { // Request to the API
      method: "GET",
    })
      .then((response) => response.json()) // parse the data
      .then((data) => {
        const promises = data.results.map((pokemon) => fetch(pokemon.url)); // get the url of each pokemon
        Promise.all(promises) // fetch all the data
          .then(
            (responses) =>
              Promise.all(responses.map((response) => response.json())) // parse all the data
          )
          .then((pokemonData) => setPokemon(pokemonData))
          .catch((error) => console.error("Error:", error)); // If there is an error, log it
      });
  }, [offset, limit]);

  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    // Handle the search input
    setSearchTerm(event.target.value); // set the search term
  };

  return (
    <main className="home">
      <div className="container">
        <h2>Tous les Pokémons</h2>
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="cards">
        {filteredPokemon.length === 0 && searchTerm && <p>Aucun résultat</p>} {/* if there is no result, display a message */}

        {filteredPokemon.map((pokemon, index) => ( // display all the pokemons
          <Card
            typeButton="addButton"
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.sprites.other.dream_world.front_default}
            type1={pokemon.types[0].type.name}
            type2={pokemon.types[1] && pokemon.types[1].type.name}
            type3={pokemon.types[2] && pokemon.types[2].type.name}
          />
        ))}
      </div>
      <div className="buttonsPages">
        <button onClick={loadPreviousPage}>Précédent</button> {/* load the previous page */}
        <button onClick={loadNextPage}>Suivant</button> {/* load the next page */}
      </div>
    </main>
  );
}
