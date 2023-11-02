import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import Logo from "../../assets/International_Pokémon_logo.svg.png"
import Logo2 from "../../assets/pokemon-logo-black-transparent.png"
export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo2} alt="" className="logo"/>
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
