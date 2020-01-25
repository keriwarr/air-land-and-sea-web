import React from "react";
import styled from "styled-components";
import { RoundState, PLAYER, THEATERS } from "air-land-and-sea-engine";
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

const PlayerTheater = styled.div<{ opponent?: boolean; center?: boolean }>`
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
}

const Icons = { AIR: Wind, LAND: Land, SEA: Wave };

const PlayingField: React.FC<IProps> = ({ boardState }) => (
  <PlayingFieldContainer>
    <Grid>
      {[PLAYER.TWO, PLAYER.ONE].map(player =>
        // TODO use the theater permutation from roundState
        THEATERS.map(theater => (
          /* TODO select player using game state */
          <PlayerTheater
            opponent={player === PLAYER.TWO}
            key={`${theater}-${player}`}
            center={THEATERS[1] === theater}
          >
            {boardState[theater][player].map(
              ({ card, faceUp }, index, cards) => (
                <CardContainer key={card.id} index={cards.length - index - 1}>
                  <Card
                    card={card}
                    // TODO - theming?
                    Icons={Icons}
                    flipped={!faceUp}
                  />
                </CardContainer>
              )
            )}
          </PlayerTheater>
        ))
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
