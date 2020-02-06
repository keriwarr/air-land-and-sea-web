import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      history.push('/')
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </Container>
  );
};

export default LogIn;
