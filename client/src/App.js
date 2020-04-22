import React from 'react';
import Menu from "./component/Menu";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import TodoList from "./component/TodoList";
import Another from "./component/Another"
import './css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <Router>
      <Menu/>
      <Switch>
        <Route exact path="/todos/:page" component={TodoList} />
        <Route path="/another" component={Another} />
      </Switch>
    </Router>
  );
}

export default App;
