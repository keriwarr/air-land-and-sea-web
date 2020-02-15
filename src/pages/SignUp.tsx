import React from "react";
import styled from "styled-components";
import SignupForm from "components/SignupForm";
import { CenteredRow, CenteredColumn } from "components/Flex";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUp: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <CenteredRow>
        <SignupForm standAlone={true} />
      </CenteredRow>
      <CenteredRow>
        <CenteredColumn>
          <div>Been here before?</div>
          <Link to={{ pathname: "/login", search: location.search }}>
            Click here to log in.
          </Link>
        </CenteredColumn>
      </CenteredRow>
    </Container>
  );
};

export default SignUp;
