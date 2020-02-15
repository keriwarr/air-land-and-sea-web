import React from "react";
import { UnauthenticatedAuthStore } from "stores/auth";
import styled from "styled-components";
import { FixedSizeSpacer, CenteredRow, GrowingSpacer } from "components/Flex";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import FormContainer from "components/FormContainer";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 1.8em;
`;

interface IProps {
  auth: UnauthenticatedAuthStore;
}

const UnauthenticatedHome: React.FC<IProps> = observer(({ auth }) => {
  if (auth.isProbablyLoggedIn) {
    return (
      <Container>
        <GrowingSpacer />
        Loading...
        <GrowingSpacer />
      </Container>
    );
  }

  return (
    <Container>
      <GrowingSpacer />
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
      <GrowingSpacer />
      <CenteredRow>
        <Link to="/tos">Terms and Conditions</Link>
        <FixedSizeSpacer flexBasis={10} />
        |
        <FixedSizeSpacer flexBasis={10} />
        <Link to="/privacy">Privacy Policy</Link>
      </CenteredRow>
      <FixedSizeSpacer flexBasis={10} />
    </Container>
  );
});

export default UnauthenticatedHome;
