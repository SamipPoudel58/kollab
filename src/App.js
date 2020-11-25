import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
import CreateProject from "./components/projects/CreateProject";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={CreateProject} />
          <Route path="/edit/:projectId" component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
