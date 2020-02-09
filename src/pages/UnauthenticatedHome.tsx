import React from "react";
import { UnauthenticatedAuthStore } from "stores/auth";
import styled from "styled-components";
import { FixedSizeSpacer, CenteredRow } from "components/Flex";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import FormContainer from "components/FormContainer";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 1.8em;
`;

interface IProps {
  auth: UnauthenticatedAuthStore;
}

const UnauthenticatedHome: React.FC<IProps> = ({ auth }) => (
  <Container>
    <Header>Welcome to Air, Land, & Sea ONLINE!</Header>
    <FixedSizeSpacer flexBasis={50} />
    <CenteredRow>
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <FixedSizeSpacer flexBasis={40} />
      <FormContainer>
        <SignupForm />
      </FormContainer>
    </CenteredRow>
  </Container>
);

export default UnauthenticatedHome;
