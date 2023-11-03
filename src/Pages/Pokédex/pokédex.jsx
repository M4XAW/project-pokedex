import React, { useEffect, useState } from "react";
import "./pokédex.scss";

import Card from "../../Components/Card/card";
import Pokeball from "../../Assets/Images/pokéball.png";

import Popup from "../../Components/PopUp/popup";

export default function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedData = Object.values(localStorage) // get all the values from the local storage
      .map((item) => {
        try { //
          return JSON.parse(item); // parse the data
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null); // If the data is not null, return it
    setPokemonList(storedData); // set the state of the pokemon list
  }, []);

  const removeAllPokemon = () => {
    localStorage.clear();
    setPokemonList([]);
  };

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
      (!filterName || pokemon.name.toLowerCase().includes(filterName.toLowerCase()))
    );
  });

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
          <button onClick={removeAllPokemon}>x</button>
          <div>
          <input
            type="text"
            placeholder="Filtrer par nom"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        </div>
      </div>
      {pokemonList.length === 0 ? (
        <div className="empty">
          <p>Votre pokédex est vide.</p>
        </div>
      ) : (
        <div className="cards">
          {filteredPokemonList.map((pokemon, index) => (
            <Card
              typeButton="removeButton"
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              type1={pokemon.type1}
              type2={pokemon.type2}
              type3={pokemon.type3}
              onClick={() => setShowPopup(true)}
            />
            // { showPopup && <Popup onClose={() => setShowPopup(false)} />
          ))}
        </div>
      )}
    </div>
  );
}
