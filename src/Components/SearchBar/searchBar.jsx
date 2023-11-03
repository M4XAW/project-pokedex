import React from "react";
import "./searchBar.scss";

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Rechercher"
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
}
