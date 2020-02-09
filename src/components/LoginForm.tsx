import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { FixedSizeSpacer, CenteredRow } from "components/Flex";
import { useAuthStore } from "utils/useAuthStore";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface IProps {
  standAlone?: boolean;
}

const LoginForm: React.FC<IProps> = ({ standAlone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.login(history, location, email, password);
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
      <CenteredRow>
        <input
          type="submit"
          value="Submit"
          {...(standAlone && { tabIndex: 3 })}
        />
      </CenteredRow>
    </Form>
  );
};

export default LoginForm;
