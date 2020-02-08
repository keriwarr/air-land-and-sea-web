import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/LogIn";
import styled from "styled-components";
import { useAuthStore } from "utils/useAuthStore";
import LogoutButton from "components/LogoutButton";
import { observer } from "mobx-react";
import NewGameButton from "components/NewGameButton";
import Game from "pages/Game";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex-grow: 1;
`;

const App: React.FC = observer(() => {
  const auth = useAuthStore();

  return (
    <Router>
      <Container>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          {auth.isAuthentiated() && (
            <>
              <li>
                <LogoutButton />
              </li>
              <li>
                <NewGameButton />
              </li>
            </>
          )}
        </ul>

        <hr />

        <PageContainer>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/:gameId">
              <Game />
            </Route>
          </Switch>
        </PageContainer>
      </Container>
    </Router>
  );
});

export default App;
