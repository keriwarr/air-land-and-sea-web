import React, { useState, useEffect } from "react";
import { AuthenticatedAuthStore } from "stores/auth";
import queryString from "query-string";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { FixedSizeSpacer, CenteredRow, GrowingSpacer } from "components/Flex";
import { getHomeErrorText } from "utils/errors";
import UsersOnlineWidget from "components/UsersOnlineWidget";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  color: red;
  font-style: italic;
`;

interface IProps {
  auth: AuthenticatedAuthStore;
}

const AuthenticatedHome: React.FC<IProps> = ({ auth }) => {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const queryError = queryString.parse(location.search)["error"];

  useEffect(() => {
    if (!queryError) {
      return;
    }

    setError(Array.isArray(queryError) ? queryError[0] : queryError);
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [queryError]);

  return (
    <Container>
      <FixedSizeSpacer flexBasis={50} />
      <FixedSizeSpacer flexBasis={50}>
        {error !== null && (
          <CenteredRow>
            <ErrorText>{getHomeErrorText(error)}</ErrorText>
          </CenteredRow>
        )}
      </FixedSizeSpacer>
      <CenteredRow>
        <h3>Hey there, {auth.displayName()}.</h3>
      </CenteredRow>
      <FixedSizeSpacer flexBasis={20} />
      <CenteredRow>
        <UsersOnlineWidget />
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
};

export default AuthenticatedHome;
