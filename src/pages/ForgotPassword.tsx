import React from "react";
import styled from "styled-components";
import { CenteredRow } from "components/Flex";
import ForgotPasswordForm from "components/ForgotPasswordForm";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ForgotPassword: React.FC = () => (
  <Container>
    <CenteredRow>
      <ForgotPasswordForm standAlone={true} />
    </CenteredRow>
  </Container>
);

export default ForgotPassword;
