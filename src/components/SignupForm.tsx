import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { FixedSizeSpacer, CenteredRow } from "./Flex";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
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
    auth.signup(history, displayName, email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>Display Name</label>
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
      <CenteredRow>
        <input
          type="submit"
          value="Submit"
          {...(standAlone && { tabIndex: 4 })}
        />
      </CenteredRow>
    </Form>
  );
};

export default SignupForm;
