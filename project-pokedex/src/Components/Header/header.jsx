import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>LOGO</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Liste pokémon</Link>
          </li>
          <li>
            <Link to="/pokédex">Mon pokédex</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
