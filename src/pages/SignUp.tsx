import React from "react";
import styled from "styled-components";
import SignupForm from "components/SignupForm";
import { CenteredRow } from "components/Flex";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUp: React.FC = () => (
  <Container>
    <CenteredRow>
      <SignupForm standAlone={true} />
    </CenteredRow>
  </Container>
);

export default SignUp;
