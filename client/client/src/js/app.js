import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Router, Route, Link } from 'react-router';

import Login from './layout/login';
import Register from './layout/register';
import Panel from './layout/panel';
import Tree from './layout/tree';

let routers = (
  <Router>
    <Route path='/' component={Panel}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
    <Route path='/task' component={Panel}></Route>
    <Route path='/tree' component={Tree}></Route>
  </Router>
);
ReactDOM.render(routers, document.getElementById('content'));