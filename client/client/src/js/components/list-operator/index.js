require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var Select = require('rctui/Select');
var Datepicker = require('rctui/Datepicker');

var ListOperator = React.createClass({
  getInitialState: function() {
    return {
      isPined: false,
      isDelayed: false,
      isCompleted: false,
      isShowDatepicker: false
    }
  },
  handlePin: function(event) {
    event.stopPropagation();
    this.setState({
      isPined: !this.state.isPined
    });
  },
  handleDelay: function(event) {
    event.stopPropagation();
    this.setState({
      isDelayed: !this.state.isDelayed,
      isShowDatepicker: true
    });
  },
  handleComplete: function(event) {
    event.stopPropagation();
    this.setState({
      isCompleted: !this.state.isCompleted
    });
  },
  handleCategory: function(event) {
    event.stopPropagation();
  },
  render: function() {
    return (
      <div className="mailbox-operation">
        <span className={classNames({'selected': this.state.isPined})} title="固定至收件箱中" 
          onClick={this.handlePin}>
          <i className="iconfont icon-pin"></i>
        </span>
        <span className={classNames({'selected': this.state.isDelayed})} title="延后至..." 
          onClick={this.handleDelay}>
          <i className="iconfont icon-shijian"></i>
          {this.state.isShowDatepicker ? <Datepicker onChange={(value) => this.setState({ normal: value })}/> : null}
        </span>
        <span className={classNames({'selected': this.state.isCompleted})} title="标为处理完毕" 
          onClick={this.handleComplete}>
          <i className="iconfont icon-queren"></i>
        </span>
        <span title="移到..." 
          onClick={this.handleCategory}>
          <i className="iconfont icon-more"></i>
        </span>
      </div>
    );
  }
});

module.exports = ListOperator;