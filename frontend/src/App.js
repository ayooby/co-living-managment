import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Apartment from "./components/Apartment";
import ApartmentsList from "./components/ApartmentsList";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/my-lists" component={ApartmentsList} />
          <Route exact path="/apartment/:id/" component={Apartment} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
