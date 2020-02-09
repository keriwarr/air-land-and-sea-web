import React from "react";
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { observer } from "mobx-react";

const NewGameButton: React.FC = observer(() => {
  const history = useHistory();
  const auth = useAuthStore();

  if (!auth.isAuthentiated()) {
    return null;
  }

  const newGame = async () => {
    if (!auth.isAuthentiated()) {
      return null;
    }

    const docRef = await firebase
      .firestore()
      .collection("rounds")
      .add({
        playerOneUid: auth.uid(),
        playerOneName: auth.displayName()
      });

    history.push(`/${docRef.id}`);
  };

  return <button onClick={newGame}>Start a New Game</button>;
});
export default NewGameButton;
