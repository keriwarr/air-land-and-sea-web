import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/Signup";
import Login from "pages/Login";
import styled from "styled-components";
import Game from "pages/Game";
import Tos from "pages/Tos";
import Navbar from "components/Navbar";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import ForgotPassword from "pages/ForgotPassword";
import Privacy from "pages/Privacy";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  /* display: flex; */
  min-height: 0;
  overflow-y: scroll;
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
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/tos">
            <Tos />
          </Route>
          <AuthenticatedRoute path="/:gameId">
            <Game />
          </AuthenticatedRoute>
          {/* TODO - default route */}
        </Switch>
      </PageContainer>
    </Container>
  </Router>
);

export default App;
