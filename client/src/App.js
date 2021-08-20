import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { navMenu } from "./const";
import AddEmployeeForm from "./components/AddEmployeeForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 5rem);
`;
const App = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    axios.get("/api/v1/employees").then((res) => {
      setResponse(res.data);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar menuList={navMenu} />
        <Container>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/analytics" />} />
            <Route path="/add-employee">
              <AddEmployeeForm />
            </Route>
            <Route path="/list-employee">
              <h1>{response?.body} List</h1>
            </Route>
            <Route path="/analytics">
              <h1>{response?.body} Analytics</h1>
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
