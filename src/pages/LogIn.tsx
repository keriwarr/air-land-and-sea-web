import React from "react";
import styled from "styled-components";
import LoginForm from "components/LoginForm";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login: React.FC = () => (
  <Container>
    <LoginForm standAlone={true} />
  </Container>
);

export default Login;
