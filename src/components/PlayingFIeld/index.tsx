import React from "react";
import styled from "styled-components";
import {
  RoundState,
  PLAYER,
  THEATERS,
  THEATER,
  getOtherPlayer
} from "air-land-and-sea-engine";
import Card from "components/Card";
import Wind from "icons/Wind";
import Land from "icons/Land";
import Wave from "icons/Wave";
import { THEATER_COLOR } from "theme";

const PlayingFieldContainer = styled.div`
  height: 100%;
`;

const Grid = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 90px 0px;

  justify-items: center;
`;

const PlayerTheater = styled.div<{
  opponent?: boolean;
  center?: boolean;
  selectable?: boolean;
}>`
  width: 100%;
  height: 100%;
  align-self: ${props => (props.opponent ? "start" : "end")};

  display: flex;
  justify-content: center;
  position: relative;

  ${props =>
    props.center
      ? `
  border-right: 1px solid #777;
  border-left: 1px solid #777;
  `
      : ""}

  ${props => (props.opponent ? "transform: rotate(180deg);" : "")}

  ${props =>
    props.selectable
      ? `
    background-color: #ccffdd;
    border: 1px solid #aaddbb;
    border-radius: 10px;
    margin-right: 5px;
    margin-left: 5px;
    width: calc(100% - 10px);
    cursor: pointer;
  `
      : ""}
`;

const CardContainer = styled.div<{ index: number }>`
  position: absolute;
  z-index: ${props => props.index + 10};
  transform-origin: top center;
  transform: scale(0.7);
  top: ${props => 55 * props.index}px;
`;

const CenterFieldContainer = styled.div`
  position: absolute;
  /* these are very coupled, clean up */
  top: 155px;
  height: 90px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  boardState: RoundState["boardState"];
  whoAmI: PLAYER;
  onOwnTheaterSelected: (theater: THEATER) => void;
  onAnyTheaterSelected: (theater: THEATER, player: PLAYER) => void;
  anticipation:
    | "ownTheater"
    | "anyTheater"
    | "ownFaceDownCard"
    | "ownCard"
    | null;
}

const Icons = { AIR: Wind, LAND: Land, SEA: Wave };

enum POSITION {
  OPPONENT = "OPPONENT",
  SELF = "SELF"
}
const POSITIONS = Object.values(POSITION);

const PlayingField: React.FC<IProps> = ({
  boardState,
  whoAmI,
  onOwnTheaterSelected,
  onAnyTheaterSelected,
  anticipation
}) => (
  <PlayingFieldContainer>
    <Grid>
      {POSITIONS.map(position =>
        // FIXME use the theater permutation from roundState
        THEATERS.map(theater => {
          const positionPlayer =
            position === POSITION.SELF ? whoAmI : getOtherPlayer(whoAmI);
          const theaterCards = boardState[theater][positionPlayer];
          const selectable =
            anticipation === "anyTheater" ||
            (position === POSITION.SELF && anticipation === "ownTheater");

          return (
            /* TODO select player using game state */
            <PlayerTheater
              opponent={position === POSITION.OPPONENT}
              key={`${theater}-${position}`}
              center={THEATERS[1] === theater}
              selectable={selectable}
              onClick={() => {
                if (selectable) {
                  if (anticipation === "ownTheater") {
                    onOwnTheaterSelected(theater);
                  } else if (anticipation === "anyTheater") {
                    onAnyTheaterSelected(theater, positionPlayer);
                  } else {
                    throw new Error("foo");
                  }
                }
              }}
            >
              {theaterCards.map(({ card, faceUp }, index) => (
                <CardContainer
                  key={card.id}
                  index={theaterCards.length - index - 1}
                >
                  <Card
                    card={card}
                    // TODO - theming?
                    Icons={Icons}
                    flipped={!faceUp}
                  />
                </CardContainer>
              ))}
            </PlayerTheater>
          );
        })
      )}
    </Grid>
    <CenterFieldContainer>
      {THEATERS.map(theater => {
        const Icon = Icons[theater];
        return (
          <Icon key={theater} height="50%" fill={THEATER_COLOR[theater]} />
        );
      })}
    </CenterFieldContainer>
  </PlayingFieldContainer>
);

export default PlayingField;
