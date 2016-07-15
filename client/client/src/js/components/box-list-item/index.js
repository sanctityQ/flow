require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var TaskDetail = require('../task-detail');
var TaskExtra = require('../task-extra');
var Operator = require('../list-operator');
var classNames = require('classnames');

var BoxListItem = React.createClass({
  getInitialState() {
    return {
      isShowTaskView: false,
      active: true
    }
  },
  toggleTaskView() {
    this.setState({
      isShowTaskView: !this.state.isShowTaskView
    });
  },
  handlePin() {
    this.setState({active: false});
  },
  handleDelay() {
    this.setState({
      isDelayed: !this.state.isDelayed
    });
  },
  handleComplete() {
    this.setState({active: false});
  },
  handleCategory(event) {
    event.stopPropagation();
  },
  render() {
    if (this.state.isShowTaskView) {
      return (
        <div className="task-view">
          <div className="task">
            <div className="task-title" onClick={this.toggleTaskView}>
              <b>{this.props.data.title}</b> - {this.props.data.abstract}
              <Operator
                onPin={()=>{this.handlePin()}} 
                onDelay={()=>{this.handleDelay()}} 
                onComplete={()=>{this.handleComplete()}}/>
            </div>
            <TaskDetail onChange={this.handleChange} placeholder={this.props.data.title}/>
            <TaskExtra />
          </div>
        </div>
      );
    } else {    
      return (
        <div ref="list" onClick={this.toggleTaskView} className={classNames('list-item', {'active': this.state.active})}>
          <span className="mailbox-avatar" title={this.props.data.name.slice(0, 1)}></span>
          <span className="mailbox-name"><a href="read-mail.html">{this.props.data.name}</a></span>
          <span className="mailbox-subject">
            <b>{this.props.data.title}</b> - {this.props.data.abstract}
          </span>
          <Operator
            onPin={()=>{this.handlePin()}} 
            onDelay={()=>{this.handleDelay()}} 
            onComplete={()=>{this.handleComplete()}}/>
        </div>
      );
    }
  }
});

module.exports = BoxListItem;