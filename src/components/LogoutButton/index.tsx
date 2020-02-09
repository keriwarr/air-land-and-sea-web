import React from "react";
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const history = useHistory();

  return (
    <button
      onClick={async () => {
        try {
          await firebase.auth().signOut();

          // if not already at '/' ?
          history.push("/");
        } catch (e) {
          console.error(e);
        }
      }}
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
