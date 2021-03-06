import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card as CardInstance } from "air-land-and-sea-engine";
import Card from "components/Card";
import Wind from "icons/Wind";
import Land from "icons/Land";
import Wave from "icons/Wave";

const CardPositioner = styled.div<{ position: number; selected: boolean }>`
  cursor: pointer;
  flex-basis: 2.25in;
  transform: translate(
      ${props => props.position * -70}px,
      ${props => Math.floor(props.position * props.position * 13)}px
    )
    rotate(${props => props.position * 10}deg);
  transition: transform 0.6s;

  ${props =>
    props.selected
      ? `
    transform: translate(${props.position * -70}px, -100px);
  `
      : ""}
`;

const CardFlipper = styled.div<{ flipped: "initial" | "faceUp" | "faceDown" }>`
  ${props =>
    props.flipped === "faceUp"
      ? "animation: flipFirstHalf-1 0.15s ease-in 0s, flipSecondHald-1 0.15s ease-out 0.15s;"
      : props.flipped === "faceDown"
      ? "animation: flipFirstHalf-2 0.15s ease-in 0s, flipSecondHald-2 0.15s ease-out 0.15s;"
      : ""}

  @keyframes flipFirstHalf-1 {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(90deg);
    }
  }
  @keyframes flipSecondHald-1 {
    0% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
  @keyframes flipFirstHalf-2 {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(90deg);
    }
  }
  @keyframes flipSecondHald-2 {
    0% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
`;

const FlipButton = styled.div<{ position: number }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: black;
  cursor: pointer;

  position: absolute;
  top: 15px;
  right: -35px;

  animation: fadein 0.6s;
  /* TODO - proper way to do keyframes in styled components? */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface IHandCardProps {
  card: Readonly<CardInstance>;
  position: number;
  selected: boolean;
  onClick?: () => void;
  onFlip?: (faceUp: boolean) => void;
  onFaceUpChange?: (faceUp: boolean) => void;
}

const HandCard: React.FC<IHandCardProps> = ({
  card,
  position,
  selected,
  onClick,
  onFaceUpChange,
  onFlip
}) => {
  const [flipped, setFlipped] = useState<"initial" | "faceUp" | "faceDown">(
    "initial"
  );
  const [cardShowingFace, setCardShowingFace] = useState<"front" | "back">(
    "front"
  );

  if (!selected && flipped === "faceDown") {
    setFlipped("faceUp");
  }

  useEffect(() => {
    if (onFaceUpChange && flipped !== "initial") {
      onFaceUpChange(flipped === "faceUp");
    }
  }, [flipped, onFaceUpChange]);

  // TODO - listen to animation events instead of using timeout
  // I think this might be an issue if it runs twice in a row due to the above
  // state update
  useEffect(() => {
    setTimeout(() => {
      if (!selected || flipped === "faceUp") {
        setCardShowingFace("front");
      } else if (flipped === "faceDown") {
        setCardShowingFace("back");
      }
    }, 150);
  }, [flipped, selected]);

  return (
    <CardPositioner key={card.id} position={position} selected={selected}>
      <CardFlipper flipped={flipped}>
        <Card
          card={card}
          // TODO - theming?
          Icons={{ AIR: Wind, LAND: Land, SEA: Wave }}
          flipped={cardShowingFace === "back"}
          onClick={onClick}
          inHand
        />
      </CardFlipper>
      {selected && (
        // TODO - flip icon. Make it flip as well?
        // TODO - use animation events to make this fade out rather than pop out
        <FlipButton
          position={position}
          onClick={() => {
            const newFlipped = flipped === "faceDown" ? "faceUp" : "faceDown";
            setFlipped(newFlipped);
            if (onFlip) {
              onFlip(newFlipped === "faceUp");
            }
          }}
        />
      )}
    </CardPositioner>
  );
};

export default HandCard;
