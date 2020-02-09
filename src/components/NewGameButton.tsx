import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { observer } from "mobx-react";
import { AuthenticatedAuthStore } from "stores/auth";

const NewGameButton: React.FC = observer(() => {
  const history = useHistory();
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    return null;
  }

  const newGame = async () => {
    if (!auth.isAuthenticated) {
      return null;
    }

    const authenticatedAuthStore = auth as AuthenticatedAuthStore;

    const docRef = await firebase
      .firestore()
      .collection("rounds")
      .add({
        playerOneUid: authenticatedAuthStore.uid(),
        playerOneName: authenticatedAuthStore.displayName()
      });

    history.push(`/${docRef.id}`);
  };

  return <button onClick={newGame}>Start a New Game</button>;
});
export default NewGameButton;
