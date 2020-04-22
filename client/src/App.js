import React from 'react';
import Menu from "./component/Menu";
import {BrowserRouter as Router, Route} from "react-router-dom"
import TodoList from "./component/TodoList";
import Another from "./component/Another"
import './css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <Router>
      <Menu/>
      <Route exact path="/" component={TodoList} />
      <Route exact path="/another" component={Another} />
    </Router>
  );
}

export default App;
