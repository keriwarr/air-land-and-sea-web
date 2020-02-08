import React from "react";
import { Card as CardInstance, THEATER } from "air-land-and-sea-engine";
import styled from "styled-components";
import { THEATER_COLOR, CARD_BACK_COLOR } from "theme";

interface ICardProps {
  card: Readonly<CardInstance>;
  Icons: {
    [THEATER.AIR]: React.FC<React.SVGProps<SVGSVGElement>>;
    [THEATER.LAND]: React.FC<React.SVGProps<SVGSVGElement>>;
    [THEATER.SEA]: React.FC<React.SVGProps<SVGSVGElement>>;
  };
  flipped: boolean;
  onClick?: () => void;
  inHand?: boolean;
  selectable?: boolean;
}

const CardContainer = styled.div<{ selectable?: boolean; flipped?: boolean }>`
  width: 2.25in;
  height: 3.11in;
  flex-shrink: 0;
  border-radius: 0.13in;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  border: ${props =>
    props.selectable ? "3px solid #aaddbb" : "3px solid black"};
  box-shadow: 0 0 9px 0 #444;
  transition: box-shadow 0.2s;
  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 0 16px 2px #444;
  }

  user-select: none;

  ${props => (props.selectable ? "cursor: pointer" : "")};

  background-color: ${props => (props.flipped ? CARD_BACK_COLOR : "white")};
`;

const CardHeader = styled.div<{ theater: THEATER; flipped?: boolean }>`
  height: 27.5%;

  display: flex;
  justify-content: space-between;
  color: white;
  text-transform: uppercase;

  padding: 6px 8px;
  font-family: "Roboto Condensed", sans-serif;
  letter-spacing: -0.4px;

  ${props =>
    props.flipped ? "" : `background-color: ${THEATER_COLOR[props.theater]}`};
`;

const CardRank = styled.div`
  font-size: 80px;
  position: relative;
  top: -20px;
  width: 40px;
  text-align: center;
  font-family: "Allerta Stencil", sans-serif;
  margin-right: 8px;
`;

const CardSpecification = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const CardTitle = styled.div`
  font-size: 20px;
`;

const CardDescription = styled.div`
  font-size: 10px;
  margin: auto 0px;
`;

const CardArt = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card: React.FC<ICardProps> = ({
  card,
  Icons,
  flipped,
  onClick,
  inHand,
  selectable
}) => {
  const Icon = Icons[card.theater];
  return (
    <CardContainer onClick={onClick} selectable={selectable} flipped={flipped}>
      <CardHeader theater={card.theater} flipped={flipped}>
        <CardRank>{flipped ? 2 : card.rank}</CardRank>
        {!flipped && (
          <CardSpecification>
            <CardTitle>{card.name}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardSpecification>
        )}
      </CardHeader>
      <CardArt>
        {(!flipped || inHand) && (
          <Icon width="50%" height="50%" fill={THEATER_COLOR[card.theater]} />
        )}
      </CardArt>
    </CardContainer>
  );
};

export default Card;
