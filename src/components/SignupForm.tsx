import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";
import { FixedSizeSpacer, CenteredRow } from "./Flex";
import { getSignupErrorText } from "utils/errors";

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

const SignupForm: React.FC<IProps> = ({ standAlone }) => {
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState(false);
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

    if (!displayName) {
      setDisplayNameError(true);
    }

    if (!email || !password || !displayName) {
      return;
    }

    try {
      await auth.signup(history, location, displayName, email, password);
    } catch (e) {
      setSubmissionError(e.code);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CenteredRow>
        <h2>Sign up</h2>
      </CenteredRow>
      <FixedSizeSpacer flexBasis={15} />
      <label>Display Name</label>
      <input
        type="text"
        value={displayName}
        onChange={e => {
          setDisplayName(e.target.value);
          setDisplayNameError(false);
          setSubmissionError(null);
        }}
        autoFocus={standAlone}
        {...(standAlone && { tabIndex: 1 })}
        {...(displayNameError && { className: "error" })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setEmailError(false);
          setSubmissionError(null);
        }}
        {...(standAlone && { tabIndex: 2 })}
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
        {...(standAlone && { tabIndex: 3 })}
        {...(passwordError && { className: "error" })}
      />
      <FixedSizeSpacer flexBasis={10} />
      <CenteredRow>
        <input
          type="submit"
          value="Submit"
          {...(standAlone && { tabIndex: 4 })}
        />
      </CenteredRow>
      <FixedSizeSpacer flexBasis={10} />
      <ErrorText>
        {submissionError ? getSignupErrorText(submissionError) : <>&nbsp;</>}
      </ErrorText>
    </Form>
  );
};

export default SignupForm;
