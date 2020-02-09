import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { when } from "mobx";
import { FixedSizeSpacer } from "./Flex";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IProps {
  standAlone?: boolean;
}

const SignupForm: React.FC<IProps> = ({ standAlone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();
  const auth = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <Form onSubmit={handleSubmit}>
      <label>DisplayName</label>
      <input
        type="text"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        autoFocus={standAlone}
        {...(standAlone && { tabIndex: 1 })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        {...(standAlone && { tabIndex: 2 })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        {...(standAlone && { tabIndex: 3 })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <input
        type="submit"
        value="Submit"
        {...(standAlone && { tabIndex: 4 })}
      />
    </Form>
  );
};

export default SignupForm;
