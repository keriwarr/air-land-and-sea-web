import React from "react";
import styled from "styled-components";
import LoginForm from "components/LoginForm";
import { CenteredRow } from "components/Flex";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Login: React.FC = () => (
  <Container>
    <CenteredRow>
      <LoginForm standAlone={true} />
    </CenteredRow>
  </Container>
);

export default Login;
