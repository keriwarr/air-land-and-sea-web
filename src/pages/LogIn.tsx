import React from "react";
import styled from "styled-components";
import LoginForm from "components/LoginForm";
import { CenteredRow, CenteredColumn } from "components/Flex";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Login: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <CenteredRow>
        <LoginForm standAlone={true} />
      </CenteredRow>
      <CenteredRow>
        <CenteredColumn>
          <div>New Here?</div>
          <Link to={{ pathname: "/signup", search: location.search }}>
            Click here to sign up.
          </Link>
        </CenteredColumn>
      </CenteredRow>
    </Container>
  );
};

export default Login;
