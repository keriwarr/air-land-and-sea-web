import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "components/LogoutButton";
import NewGameButton from "components/NewGameButton";
import { useAuthStore } from "utils/useAuthStore";
import { observer } from "mobx-react";
import styled from "styled-components";
import { GrowingSpacer, FixedSizeSpacer } from "components/Flex";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  flex-shrink: 0;
  background-color: #cfcfcf;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Navbar: React.FC = observer(() => {
  const auth = useAuthStore();

  return (
    <Container>
      <FixedSizeSpacer flexBasis={40} />
      <Link to="/">
        <h3>Air, Land, & Sea</h3>
      </Link>
      <GrowingSpacer />
      {auth.isAuthenticated && (
        <>
          <NewGameButton />
          <FixedSizeSpacer flexBasis={20} />
          <LogoutButton />
        </>
      )}
      <FixedSizeSpacer flexBasis={40} />
    </Container>
  );
});

export default Navbar;
