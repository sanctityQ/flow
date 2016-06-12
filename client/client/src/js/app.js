require("!style!css!less!../style/common.less");

var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Login = require('./layout/login');
var Register = require('./layout/register');
var Panel = require('./layout/panel');
var routers = (
  <Router>
    <Route path='/' component={Login}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
    <Route path='/task' component={Panel}></Route>
  </Router>
);
ReactDom.render(routers, document.getElementById('content'));