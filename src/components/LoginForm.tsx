import React, { useState } from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { FixedSizeSpacer } from "components/Flex";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IProps {
  standAlone?: boolean;
}

const LoginForm: React.FC<IProps> = ({ standAlone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus={standAlone}
        {...(standAlone && { tabIndex: 1 })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        {...(standAlone && { tabIndex: 2 })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <input
        type="submit"
        value="Submit"
        {...(standAlone && { tabIndex: 3 })}
      />
    </Form>
  );
};

export default LoginForm;
