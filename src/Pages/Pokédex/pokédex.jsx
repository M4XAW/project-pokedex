import React, { useEffect, useState } from "react";
import "./pokédex.scss";

import Card from "../../Components/Card/card";
import Pokeball from "../../Assets/Images/pokéball.png";

import Popup from "../../Components/PopUp/popup";
import SearchBar from "../../Components/SearchBar/searchBar";

export default function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);// Initialize state for the list of Pokémon
  const [filterId] = useState("");//Initialize state for filtering by Pokémon ID
  const [filterName, setFilterName] = useState(""); // Initialize state for filtering by Pokémon name
  const [sortBy, setSortBy] = useState(null);// Initialize state for sorting criteria
  const [showPopup, setShowPopup] = useState(false);// Initialize state for displaying a popup
  const [searchTerm, setSearchTerm] = useState("");// Initialize state for the search term

  useEffect(() => { // Change the title of the page
    document.title = "Mon Pokédex";
  });

  useEffect(() => {// Load Pokémon data from local storage
    const storedData = Object.values(localStorage) // get all the values from the local storage
      .map((item) => {
        try {
          //
          return JSON.parse(item); // parse the data
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null); // If the data is not null, return it
    setPokemonList(storedData); // set the state of the pokemon list
  }, []);

  const removeAllPokemon = () => {
    localStorage.clear();// Remove all Pokémon data from local storage
    setPokemonList([]); // Clear the Pokémon list state
  };

  const sortPokemonById = () => {
    const sortedList = [...pokemonList].sort((a, b) => a.id - b.id);
    setPokemonList(sortedList);// Update the state with the sorted list
    setSortBy("id");// Set the sorting criteria to 'id'
  };

  const sortPokemonByName = () => {
    const sortedList = [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );// Sort the Pokémon list by name
    setPokemonList(sortedList);// Update the state with the sorted list
    setSortBy("name");// Set the sorting criteria to 'name'
  };

  useEffect(() => {// Apply sorting when 'sortBy' state changes
    if (sortBy === "id") {
      sortPokemonById();
    } else if (sortBy === "name") {
      sortPokemonByName();
    }
  }, [sortBy]);

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return (
      (!filterId || pokemon.id.includes(filterId)) &&// Filter by ID 
      (!filterName ||
        pokemon.name.toLowerCase().includes(filterName.toLowerCase()))
    ); // Filter by name
  });

  const handleSearchChange = (event) => {
    // Handle the search input
    setSearchTerm(event.target.value); // set the search term
  };

  return (
    <div className="pokédex">
      {/* <Popup onClose={() => setShowPopup(false)} /> */}

      <div className="container">
        <div className="title">
          <img src={Pokeball} alt="pokeball" />
          <h2>Mon pokédex</h2>
        </div>
        <div className="buttons">
          <button onClick={sortPokemonById}>Trier par ID</button>
          <button onClick={sortPokemonByName}>Trier par nom</button>
          <button className="removeAllButton" onClick={removeAllPokemon}></button>
          <div>
            <input
              type="text"
              placeholder='Rechercher'
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
        </div>
      </div>
      {pokemonList.length === 0 && (
        <div className="empty">
          <p>Votre pokédex est vide.</p>
        </div>
      )}

      {filteredPokemonList.length === 0 && !searchTerm && (
        <div className="empty">
          <p>Aucun résultat</p>
        </div>
      )}

      <div className="cards">
        {filteredPokemonList.map((pokemon, index) => (
          <Card
            typeButton="removeButton"
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            img = {pokemon.img}
            type1={pokemon.type1}
            type2={pokemon.type2}
            type3={pokemon.type3}
            onClick={() => setShowPopup(true)}
          />
        ))}
      </div>
    </div>
  );
}
