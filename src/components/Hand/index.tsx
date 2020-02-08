import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card as CardInstance } from "air-land-and-sea-engine";
import { observer } from "mobx-react";
import HandCard from "components/HandCard";

interface IHandProps {
  cards: Readonly<CardInstance>[];
  onSelectionChanged: (id: number | null) => void;
}

const HandContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Hand: React.FC<IHandProps> = observer(({ cards, onSelectionChanged }) => {
  const [selectedCardIndex, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    setSelectedCard(null);
  }, [cards]);

  return (
    <div>
      <HandContainer>
        {cards.map((card, index) => (
          <HandCard
            key={card.id}
            position={index - (cards.length - 1) / 2}
            selected={selectedCardIndex === index}
            card={card}
            // TODO - how to avoid inline arrow fns with react hooks?
            onClick={() => {
              const selection = selectedCardIndex === index ? null : index;
              setSelectedCard(selection);
              onSelectionChanged(
                selection === null ? null : cards[selection].id
              );
            }}
          />
        ))}
      </HandContainer>
    </div>
  );
});

export default Hand;
