import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import firebase from 'firebase/app';
import { observable, action, computed, reaction } from "mobx";
import AuthStore from "stores/auth";
import { useAuthStore } from "utils/useAuthStore";
import { isNotNull } from "utils/types";
import {
  RoundState,
  THEATER,
  PLAYER,
  Deck,
  DECISION_TYPE
} from "air-land-and-sea-engine";
import styled from "styled-components";
import PlayingField from "components/PlayingFIeld";
import Hand from "components/Hand";

class GameStore {
  constructor(private auth: AuthStore) {}

  @observable
  playerOneUid?: string;

  @observable
  playerOneName?: string;

  @observable
  playerTwoUid?: string;

  @observable
  playerTwoName?: string;

  @observable
  roundState?: string;

  @computed
  get gameInitialized() {
    return !!this.playerOneUid;
  }

  @computed
  get inGame() {
    return (
      this.auth.isAuthenticated() &&
      (this.auth.uid() === this.playerOneUid ||
        this.auth.uid() === this.playerTwoUid)
    );
  }

  @computed
  get gameFull() {
    return !!this.playerOneUid && !!this.playerTwoUid;
  }

  @action
  public readonly reset = () => {
    this.playerTwoUid = undefined;
    this.playerTwoName = undefined;
    this.roundState = undefined;
  };

  @action
  public readonly setFromFirebase = (data: firebase.firestore.DocumentData) => {
    // TODO - make sure they're strings?
    this.playerOneUid = data["playerOneUid"];
    this.playerOneName = data["playerOneName"];
    this.playerTwoUid = data["playerTwoUid"];
    this.playerTwoName = data["playerTwoName"];
    this.roundState = data["roundState"];
  };
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const PlayingFieldContainer = styled.div`
  position: fixed;
  top: 100px;
  height: 400px;
  width: 600px;
  transform: scale(0.7);
`;

const HandContainer = styled.div`
  position: fixed;
  top: 550px;
  transform: scale(0.7);
  transform-origin: top center;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 50px;

  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Game: React.FC = observer(() => {
  const { gameId } = useParams();
  const auth = useAuthStore();
  const [gameStore] = useState(new GameStore(auth));
  const history = useHistory();
  const location = useLocation();
  const [roundState, setRoundState] = useState(
    () => new RoundState([THEATER.AIR, THEATER.LAND, THEATER.SEA])
  );
  const [selectedCard, setSelectedCard] = useState<{
    id: number;
    faceUp: boolean;
  } | null>(null);
  const [deckIsSet, setDeckIsSet] = useState(false);
  const [transportOrigin, setTransportOrigin] = useState<{
    theater: THEATER;
    indexFromTop: number;
  } | null>(null);

  const pushGameState = () => {
    gameDocRef.set(
      {
        roundState: JSON.stringify(roundState.toJSON())
      },
      { merge: true }
    );
  };

  const gameDocRef = firebase
    .firestore()
    .collection("rounds")
    .doc(gameId);

  useEffect(() => {
    setRoundState(new RoundState([THEATER.AIR, THEATER.LAND, THEATER.SEA]));
    setDeckIsSet(false);
    setSelectedCard(null);
    gameStore.reset();
  }, [gameId, gameStore]);

  useEffect(() =>
    reaction(
      () => gameStore.roundState,
      roundStateString => {
        if (!roundStateString) {
          return;
        }

        try {
          const roundStateObj: {
            deck: ReturnType<RoundState["toJSON"]>["deck"];
            moves: ReturnType<RoundState["toJSON"]>["moves"];
          } = JSON.parse(roundStateString);
          const { deck, moves } = roundStateObj;

          if (!deckIsSet) {
            setRoundState(
              new RoundState(
                [THEATER.AIR, THEATER.LAND, THEATER.SEA],
                {},
                new Deck(
                  deck.map(({ cardTypeKey, theater, name, id }) => ({
                    cardTypeKey,
                    theater,
                    name,
                    id
                  })),
                  false
                )
              )
            );
            setDeckIsSet(true);
          }
          if (moves.length > roundState.numMoves) {
            moves
              .slice(roundState.numMoves)
              .filter(isNotNull)
              .forEach(move => {
                roundState.playMove(move);
              });
          }
        } catch (e) {
          console.error(e);
        }
      }
    )
  );

  useEffect(() => {
    return gameDocRef.onSnapshot(doc => {
      gameStore.setFromFirebase(doc.data() || {});
    });
  }, [gameDocRef, gameId, gameStore]);

  useEffect(() => {
    if (!gameStore.gameInitialized || !auth.isAuthenticated()) {
      return;
    }

    if (gameStore.gameFull && !gameStore.inGame) {
      history.push(`/`);
      return;
    }

    if (!gameStore.inGame) {
      gameDocRef
        .set(
          {
            playerTwoUid: auth.uid(),
            playerTwoName: auth.displayName(),
            roundState: JSON.stringify(roundState.toJSON())
          },
          { merge: true }
        )
        .then(() => {
          setDeckIsSet(true);
        });
    }
  }, [gameId, gameStore.gameInitialized, gameStore.gameFull, gameStore.inGame, history, auth, roundState, gameDocRef, location.pathname]);

  const handleCardSelectionChanged = useCallback(
    (cardId: number | null, faceUp: boolean) => {
      setSelectedCard(cardId === null ? null : { id: cardId, faceUp });
    },
    []
  );

  if (!auth.isAuthenticated()) {
    return null;
  }

  if (!gameStore.gameInitialized) {
    return <div>Loading...</div>;
  }

  if (!gameStore.gameFull) {
    return (
      <div>
        Waiting for another player to join. Share your URL with a friend or an
        enemy.
      </div>
    );
  }

  const whoAmI = (() => {
    if (gameStore.playerOneUid === auth.uid()) {
      return PLAYER.ONE;
    }
    if (gameStore.playerTwoUid === auth.uid()) {
      return PLAYER.TWO;
    }
    throw new Error("Why didn't it redirect?");
  })();

  const hand =
    whoAmI === PLAYER.ONE ? roundState.currentHandP1 : roundState.currentHandP2;

  const roundIsComplete = roundState.complete;

  const isMyTurn = whoAmI === roundState.activePlayer && !roundIsComplete;

  const { anticipatedDecision } = roundState;

  const handleOwnTheaterSelected = (theater: THEATER) => {
    if (!isMyTurn) {
      throw new Error("shouldnt have happened");
    }

    if (anticipatedDecision === null) {
      if (selectedCard === null) {
        throw new Error("what?");
      }

      roundState.playCard({
        theater,
        id: selectedCard.id,
        faceUp: selectedCard.faceUp
      });
      setSelectedCard(null);
      pushGameState();

      return;
    }

    if (anticipatedDecision.type === DECISION_TYPE.REINFORCE_DECISION) {
      // TODO: allow not making this decision
      roundState.playReinforceDecision({
        made: {
          theater
        }
      });
      pushGameState();

      return;
    }

    if (
      anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION &&
      transportOrigin !== null
    ) {
      // TODO: allow not making this decision
      roundState.playTransportDecision({
        made: {
          destinationTheater: theater,
          originIndexFromTop: transportOrigin.indexFromTop,
          originTheater: transportOrigin.theater
        }
      });
      setTransportOrigin(null);
      pushGameState();
      return;
    }

    throw new Error("this shouldnt have been called");
  };

  const handleAnyTheaterSelected = (theater: THEATER, player: PLAYER) => {
    if (!isMyTurn) {
      throw new Error("shouldnt have happened");
    }

    if (
      anticipatedDecision === null ||
      anticipatedDecision.type !== DECISION_TYPE.FLIP_DECISION
    ) {
      throw new Error("shouldnt have happened");
    }

    roundState.playFlipDecision({
      theater,
      targetedPlayer: player
    });
    pushGameState();
  };

  const handleOwnCardSelected = (theater: THEATER, indexFromTop: number) => {
    if (!isMyTurn) {
      throw new Error("shouldnt have happened");
    }

    if (anticipatedDecision === null) {
      throw new Error("shouldnt have happened");
    }

    if (anticipatedDecision.type === DECISION_TYPE.REDEPLOY_DECISION) {
      roundState.playRedeployDecision({
        made: {
          theater,
          indexFromTop
        }
      });
      pushGameState();
      return;
    }

    if (anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION) {
      setTransportOrigin({
        theater,
        indexFromTop
      });
      return;
    }

    throw new Error("shouldnt have happened");
  };

  const handleOptOut = () => {
    if (!isMyTurn) {
      throw new Error("shouldnt have happened");
    }

    if (anticipatedDecision === null) {
      throw new Error("shouldnt have happened");
    }

    if (anticipatedDecision.type === DECISION_TYPE.REINFORCE_DECISION) {
      roundState.playReinforceDecision({
        made: null
      });
      pushGameState();
      return;
    }

    if (anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION) {
      roundState.playTransportDecision({
        made: null
      });
      pushGameState();
      return;
    }

    throw new Error("shouldnt have happened");
  };

  const playingFieldAnticipation = (() => {
    if (!isMyTurn) {
      return null;
    }

    if (anticipatedDecision === null) {
      if (selectedCard === null) {
        return null;
      }

      return "ownTheater";
    }

    if (anticipatedDecision.type === DECISION_TYPE.FLIP_DECISION) {
      return "anyTheater";
    }

    if (anticipatedDecision.type === DECISION_TYPE.REDEPLOY_DECISION) {
      return "ownFaceDownCard";
    }

    if (anticipatedDecision.type === DECISION_TYPE.REINFORCE_DECISION) {
      return "ownTheater";
    }

    if (
      anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION &&
      transportOrigin !== null
    ) {
      return "ownTheater";
    }

    if (anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION) {
      return "ownCard";
    }

    throw new Error("What?");
  })();

  const canOptOut = (() => {
    if (!isMyTurn) {
      return false;
    }

    if (anticipatedDecision === null) {
      return false;
    }

    if (anticipatedDecision.type === DECISION_TYPE.REINFORCE_DECISION) {
      return true;
    }

    if (anticipatedDecision.type === DECISION_TYPE.TRANSPORT_DECISION) {
      return true;
    }

    return false;
  })();

  const canSurrender = (() => {
    if (anticipatedDecision !== null) {
      return false;
    }

    if (isMyTurn) {
      return true;
    }

    return false;
  })();

  const handleSurrender = () => {
    roundState.surrender();
    pushGameState();
  };

  const opponentName =
    whoAmI === PLAYER.ONE ? gameStore.playerTwoName : gameStore.playerOneName;

  const gameStatusText =
    roundState.victor !== null
      ? roundState.victor === whoAmI
        ? "You won that round :D"
        : "You lost that round :'("
      : isMyTurn
      ? "It's your turn!"
      : "The other player is taking their turn.";

  return (
    <Container>
      <NotificationContainer>
        <Column>
          <button disabled={!canSurrender} onClick={handleSurrender}>
            Surrender!
          </button>
          <br />
          <button disabled={!canOptOut} onClick={handleOptOut}>
            Opt Out
          </button>
        </Column>
        <Column>
          <div>You are playing against {opponentName}</div>
          <br />
          <div>{gameStatusText}</div>
        </Column>
      </NotificationContainer>
      <PlayingFieldContainer>
        <PlayingField
          boardState={roundState.boardState}
          anticipation={playingFieldAnticipation}
          whoAmI={whoAmI}
          onOwnTheaterSelected={handleOwnTheaterSelected}
          onAnyTheaterSelected={handleAnyTheaterSelected}
          onOwnCardSelected={handleOwnCardSelected}
        />
      </PlayingFieldContainer>
      <HandContainer>
        <Hand cards={hand} onSelectionChanged={handleCardSelectionChanged} />
      </HandContainer>
    </Container>
  );
});

export default Game;
