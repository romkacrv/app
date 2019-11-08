import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import Locale from './pages/Locale';
import List from './pages/List';
import Form from './pages/Form';

import './App.css';

const NotFound = () => {
  return (
    <div>Not found</div>
  )
};

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => {
        return (
          <ul>
            <li><NavLink to={'/list'}>List</NavLink></li>
            <li><NavLink to={'/locale'}>Locale</NavLink></li>
            <li><NavLink to={'/form'}>Form</NavLink></li>
          </ul>
        )
      }}/>
      <Route path="/list" component={List}/>
      <Route path="/locale" component={Locale}/>
      <Route path="/form" component={Form}/>
      <NotFound/>
    </Switch>
  )
};

export default App;
