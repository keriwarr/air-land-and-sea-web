import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { when } from "mobx";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();
  const auth = useAuthStore();

  const handleSubmit = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await when(() => auth.isAuthentiated());

      await auth.setDisplayName(displayName);

      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <label>DisplayName</label>
      <input
        type="text"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />
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

export default SignUp;
