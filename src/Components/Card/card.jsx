import React from "react";
import "./card.scss";

export default function Card(props) {
  return (
    <div key={props.index} className="card">
      <div className="cardImage">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
          alt={props.name}
        />
      </div>
      <div className="cardContent">
        <p>N° {props.id}</p>
        <h2>{props.name}</h2>
        <p>{props.height}</p>
        <p>{props.weight}</p>
        <p>{props.type1}</p>
        {props.type2 && <p>{props.type2}</p>}
        {props.type3 && <p>{props.type3}</p>}
      </div>
      <button>Ajouter</button>
    </div>
  );
}
