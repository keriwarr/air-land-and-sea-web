import React, { useState } from "react";
import { observer } from "mobx-react";
import "./App.css";
// import Card from "components/Card";
import { RoundState, THEATER } from "air-land-and-sea-engine";
import Hand from "components/Hand";
import styled from "styled-components";

const HandContainer = styled.div`
  position: fixed;
  top: 700px;
`;

const App: React.FC = observer(() => {
  const [roundState] = useState(
    () => new RoundState([THEATER.AIR, THEATER.LAND, THEATER.SEA])
  );
  // const deck = Deck.getStandard();
  return (
    <div className="App">
      <HandContainer>
        <Hand cards={roundState.currentHandP1} />
      </HandContainer>
      {/* <div className="VerticalCardList">
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
      </div> */}
    </div>
  );
});

export default App;
