import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { FixedSizeSpacer, CenteredRow } from "components/Flex";
import { useAuthStore } from "utils/useAuthStore";
import { getLoginErrorText } from "utils/errors";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 191px;
`;

const ErrorText = styled.div`
  color: red;
  font-style: italic;
  text-align: center;
`;

interface IProps {
  standAlone?: boolean;
}

const LoginForm: React.FC<IProps> = ({ standAlone }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmissionError(null);

    if (!email) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    if (!email || !password) {
      return;
    }

    try {
      await auth.login(history, location, email, password);
    } catch (e) {
      setSubmissionError(e.code);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setEmailError(false);
          setSubmissionError(null);
        }}
        autoFocus={standAlone}
        {...(standAlone && { tabIndex: 1 })}
        {...(emailError && { className: "error" })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setPasswordError(false);
          setSubmissionError(null);
        }}
        {...(standAlone && { tabIndex: 2 })}
        {...(passwordError && { className: "error" })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <CenteredRow>
        <input
          type="submit"
          value="Submit"
          {...(standAlone && { tabIndex: 3 })}
        />
      </CenteredRow>
      <FixedSizeSpacer flexBasis={10} />
      <ErrorText>
        {submissionError ? getLoginErrorText(submissionError) : <>&nbsp;</>}
      </ErrorText>
    </Form>
  );
};

export default LoginForm;
