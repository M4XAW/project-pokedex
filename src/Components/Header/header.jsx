import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
// import Logo from "../../Assets/International_Pokémon_logo.svg.png"
import Logo from "../../Assets/Logo/logo.png";

export default function Header() {
  return (
    <header>
      <Link className="logoLink" to="/">
        <img src={Logo} alt="" className="logo" />
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
