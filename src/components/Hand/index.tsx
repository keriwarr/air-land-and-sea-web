import React, { useState } from "react";
import styled from "styled-components";
import { Card as CardInstance } from "air-land-and-sea-engine";
import { observer } from "mobx-react";
import HandCard from "components/HandCard";

interface IHandProps {
  cards: Readonly<CardInstance>[];
}

const HandContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Hand: React.FC<IHandProps> = observer(({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div>
      <HandContainer>
        {cards.map((card, index) => (
          <HandCard
            key={card.id}
            position={index - (cards.length - 1) / 2}
            selected={selectedCard === index}
            card={card}
            // TODO - how to avoid inline arrow fns with react hooks?
            onClick={() => {
              setSelectedCard(selectedCard === index ? null : index);
            }}
          />
        ))}
      </HandContainer>
    </div>
  );
});

export default Hand;
