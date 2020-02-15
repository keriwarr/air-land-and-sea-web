import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation, Link } from "react-router-dom";
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

const Checkbox = styled.input`
  margin: 4px;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  user-select: none;
`;

interface IProps {
  standAlone?: boolean;
}

const LoginForm: React.FC<IProps> = ({ standAlone }) => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [staySignedIn, setStaySignedIn] = useState(auth.getPrefersStaySignedIn());

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
      await auth.login(history, location, email, password, staySignedIn);
    } catch (e) {
      setSubmissionError(e.code);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CenteredRow>
        <h2>Log in</h2>
      </CenteredRow>
      <FixedSizeSpacer flexBasis={15} />
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
      <CenteredRow>
        <Checkbox
          type="checkbox"
          checked={staySignedIn}
          id="staySignedIn"
          onChange={e => {
            setStaySignedIn(e.target.checked);
          }}
        />
        <CheckboxLabel htmlFor="staySignedIn"> Stay Signed In?</CheckboxLabel>
      </CenteredRow>
      <FixedSizeSpacer flexBasis={10} />
      <ErrorText>
        {submissionError ? getLoginErrorText(submissionError) : <>&nbsp;</>}
      </ErrorText>
      <Link to="/forgot">Forgot your Password?</Link>
    </Form>
  );
};

export default LoginForm;
