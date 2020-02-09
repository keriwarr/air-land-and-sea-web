import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/Signup";
import Login from "pages/Login";
import styled from "styled-components";
import Game from "pages/Game";
import Navbar from "components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  display: flex;
`;

const App: React.FC = () => (
  <Router>
    <Container>
      <Navbar />
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

export default App;
