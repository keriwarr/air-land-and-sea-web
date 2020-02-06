import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import PlayingFieldTest from "pages/PlayingFieldTest";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex-grow: 1;
`;

const App: React.FC = () => (
  <Router>
    <Container>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
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
          <Route path="/demo">
            <PlayingFieldTest />
          </Route>
        </Switch>
      </PageContainer>
    </Container>
  </Router>
);

export default App;
