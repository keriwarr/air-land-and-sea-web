import React from "react";
import { Card as CardInstance } from "air-land-and-sea-engine";
import "./index.css";

interface ICardProps {
  card: Readonly<CardInstance>;
  Icons: {
    "AIR": React.FC<React.SVGProps<SVGSVGElement>>,
    "LAND": React.FC<React.SVGProps<SVGSVGElement>>,
    "SEA": React.FC<React.SVGProps<SVGSVGElement>>,
  }
}

const Card: React.FC<ICardProps> = ({ card, Icons }) => (
  <div className="card">
    <div
      className={`card-header ${
        card.theater === "AIR"
          ? "card-header-air"
          : card.theater === "LAND"
          ? "card-header-land"
          : "card-header-sea"
      }`}
    >
      <div className="card-rank">{card.rank}</div>
      <div className="card-specification">
        <div className="card-title">{card.name}</div>
        <div className="card-description">{card.description}</div>
      </div>
    </div>
    <div className="card-art">
    {
        card.theater === "AIR"
          ? <Icons.AIR width="50%" height="50%" fill="#5f5950" />
          : card.theater === "LAND"
          ? <Icons.LAND width="50%" height="50%" fill="#5d6e3a" />
          : <Icons.SEA width="50%" height="50%" fill="#3c6571" />
      }
    </div>
  </div>
);

export default Card;
