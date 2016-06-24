require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var Select = require('rctui/Select');
var Datepicker = require('rctui/Datepicker');
var classNames = require('classnames');

var TaskDetail = require('../task-detail');
var TaskExtra = require('../task-extra');

var Task = React.createClass({
  getInitialState: function() {
    return {
      opacity: 1
    };
  },
  //切换关闭按钮是否显示
  toggleCloseBtn: function(titleLength) {
    this.setState({
      opacity: +titleLength
    });
  },
  render: function() {
    return (
      <div className="task-panel">
        <div className="lightbox" onClick={this.props.onCloseBtnClick}></div>
        <div className="task">
          <TaskDetail onChange={this.toggleCloseBtn}/>
          <TaskExtra />
        </div>
        <div className="close-button" onClick={this.props.onCloseBtnClick} style={{opacity: this.state.opacity}}>
          <i className="iconfont icon-guanbi"></i>
        </div>
      </div>
    )
  }
});

module.exports = Task;