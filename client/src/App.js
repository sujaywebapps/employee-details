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
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { navMenu } from "./const";
import AddEmployeeForm from "./components/AddEmployeeForm";
import styled from "styled-components";
import EmployeeList from "./components/EmployeeList";
import Analytics from "./components/Analytics";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 5rem);
`;
const App = () => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  // const [response, setResponse] = useState({});
  // useEffect(() => {
  //   axios.post("/api/v1/add-employee").then((res) => {
  //     setResponse(res.data);
  //   });
  // }, []);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <Router>
            <Navbar menuList={navMenu} />
            <button onClick={themeToggler}>Switch Theme</button>
            <Container>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/add-employee" />}
                />
                <Route path="/add-employee">
                  <AddEmployeeForm />
                </Route>
                <Route path="/list-employee">
                  <EmployeeList />
                </Route>
                <Route path="/analytics">
                  <Analytics />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
