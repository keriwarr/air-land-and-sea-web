import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { RoundState, THEATER, PLAYER } from "air-land-and-sea-engine";
import Hand from "components/Hand";
import styled from "styled-components";
import PlayingField from "components/PlayingFIeld";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const PlayingFieldContainer = styled.div`
  position: fixed;
  top: 200px;
  height: 400px;
  width: 600px;
`;

const HandContainer = styled.div`
  position: fixed;
  top: 700px;
`;

const PlayingFieldTest: React.FC = observer(() => {
  const [roundState] = useState(
    () => new RoundState([THEATER.AIR, THEATER.LAND, THEATER.SEA])
  );

  useEffect(() => {
    setTimeout(() => {
      if (roundState.complete) {
        return;
      }

      if (roundState.currentHand.length === 0) {
        roundState.surrender();
        return;
      }

      const { anticipatedDecision } = roundState;

      if (anticipatedDecision) {
        switch (anticipatedDecision.type) {
          case "FLIP_DECISION":
            return roundState.playFlipDecision({
              targetedPlayer: PLAYER.ONE,
              theater: THEATER.AIR
            });
          case "REDEPLOY_DECISION":
            return roundState.playRedeployDecision({
              made: {
                theater: THEATER.AIR,
                indexFromTop: 0
              }
            });
          case "REINFORCE_DECISION":
            return roundState.playReinforceDecision({
              made: null
            });
          case "TRANSPORT_DECISION":
            return roundState.playTransportDecision({
              made: null
            });
        }
      }

      roundState.playCard(roundState.currentHand[0].getMove());
    }, 1000);
    // eslint-disable-next-line
  }, [roundState.numMoves]);

  return (
    <Container>
      <PlayingFieldContainer>
        <PlayingField boardState={roundState.boardState} />
      </PlayingFieldContainer>
      <HandContainer>
        <Hand cards={roundState.currentHandP1} />
      </HandContainer>

      {/* <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        <hr />
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div> */}
    </Container>
  );
});

export default PlayingFieldTest;
