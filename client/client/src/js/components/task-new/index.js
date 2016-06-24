require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var classNames = require('classnames');
var TaskDetail = require('../task-detail');

var TaskNew = React.createClass({
  handleClick: function() {
    this.props.onClick();
  },
  handleMouseEnter: function() {

  },
  handleMouseLeave: function() {
    
  },
  render: function() {
    return (
      <div className="task-new">
        <div className="task-new-icon" 
          onClick={this.handleClick} 
          onMouseEnter={this.handleMouseEnter} 
          onMouseLeave={this.handleMouseLeave}>
          <i className="iconfont icon-zengjia"></i>
        </div>
      </div>
    )
  }
});

module.exports = TaskNew;