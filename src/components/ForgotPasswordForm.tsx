import React, { useState } from "react";
import styled from "styled-components";
import { FixedSizeSpacer, CenteredRow, CenteredColumn } from "components/Flex";
import { useAuthStore } from "utils/useAuthStore";
import { getPasswordResetErrorText } from "utils/errors";

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

const ForgotPasswordForm: React.FC<IProps> = ({ standAlone }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const auth = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmissionError(null);

    if (!email) {
      setEmailError(true);
      return;
    }

    try {
      await auth.resetPassword(email);
      setEmailSent(true);
    } catch (e) {
      setSubmissionError(e.code);
    }
  };

  if (emailSent) {
    return (
      <CenteredColumn>
        <h2>Email sent!</h2>
        <FixedSizeSpacer flexBasis={20} />
        <div>Check your inbox.</div>
      </CenteredColumn>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CenteredRow>
        <h2>Password Reset</h2>
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
      <CenteredRow>
        <input
          type="submit"
          value="Submit"
          {...(standAlone && { tabIndex: 2 })}
        />
      </CenteredRow>
      <FixedSizeSpacer flexBasis={10} />
      <ErrorText>
        {submissionError ? (
          getPasswordResetErrorText(submissionError)
        ) : (
          <>&nbsp;</>
        )}
      </ErrorText>
    </Form>
  );
};

export default ForgotPasswordForm;
