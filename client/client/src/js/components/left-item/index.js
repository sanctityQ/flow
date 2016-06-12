require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var LeftListItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.data.isActive ? 'active' : ''}>
        <a href="#">
          <i className={this.props.data.className}></i>
          {this.props.data.text}
          {this.props.data.num ? <span className={this.props.data.numClassName}>{this.props.data.num}</span> : ''}
        </a>
      </li>
    );
  }
});

module.exports = LeftListItem;