import React from "react";
import "./App.css";
import Card from "components/Card";
import { Deck } from "air-land-and-sea-engine";
import Wind from "icons/Wind";
import Land from "icons/Land";
import Wave from "icons/Wave";
import Plane from "icons/Plane";
import Tank from "icons/Tank";
import Ship from "icons/Ship";
import Propellor from "icons/Propellor";
import Knife from "icons/Knife";
import Anchor from "icons/Anchor";
import Pilot from "icons/Pilot";
import Grunt from "icons/Grunt";
import Captain from "icons/Captain";

const App: React.FC = () => {
  const deck = Deck.getStandard();
  return (
    <div className="App">
      <div className="VerticalCardList">
        {deck.cards.map(card => (
          <Card
            card={card}
            key={card.id}
            Icons={{ AIR: Wind, LAND: Land, SEA: Wave }}
          />
        ))}
        <div>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          <hr />
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
      <div className="VerticalCardList">
        {deck.cards.map(card => (
          <Card
            card={card}
            key={card.id}
            Icons={{ AIR: Plane, LAND: Tank, SEA: Ship }}
          />
        ))}
      </div>
      <div className="VerticalCardList">
        {deck.cards.map(card => (
          <Card
            card={card}
            key={card.id}
            Icons={{ AIR: Propellor, LAND: Knife, SEA: Anchor }}
          />
        ))}
      </div>
      <div className="VerticalCardList">
        {deck.cards.map(card => (
          <Card
            card={card}
            key={card.id}
            Icons={{ AIR: Pilot, LAND: Grunt, SEA: Captain }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
