import React from "react";
import styled from "styled-components";
import SignupForm from "components/SignupForm";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUp: React.FC = () => (
  <Container>
    <SignupForm standAlone={true} />
  </Container>
);

export default SignUp;
