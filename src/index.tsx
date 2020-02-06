import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createContext } from "react";
import AuthStore from "./stores/auth";

export const StoreContext = createContext<AuthStore>({} as AuthStore);
export const StoreProvider = StoreContext.Provider;

const firebaseConfig = {
  apiKey: "AIzaSyC7m_bz-F5YA-nNum3DqthObUfiULC9Q0o",
  authDomain: "air-land-and-sea.firebaseapp.com",
  databaseURL: "https://air-land-and-sea.firebaseio.com",
  projectId: "air-land-and-sea",
  storageBucket: "air-land-and-sea.appspot.com",
  messagingSenderId: "800470198593",
  appId: "1:800470198593:web:6e5bd9c1eac5c5b9b059c0",
  measurementId: "G-9GXCXRHMFY"
};

firebase.initializeApp(firebaseConfig);

const authStore = new AuthStore();

ReactDOM.render(
  <StoreProvider value={authStore}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
