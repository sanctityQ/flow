require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var TaskDetail = require('../task-detail');
var TaskExtra = require('../task-extra');
var Operator = require('../list-operator');

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
  handleSnoozed() {
    this.setState({
      isSnoozed: !this.state.isSnoozed
    });
  },
  handleDone() {
    this.setState({active: false});
  },
  handleCategory(event) {
    event.stopPropagation();
  },
  render() {
    if (this.state.isShowTaskView) {
      return (
        <div className={classNames('task-view', {'active': this.state.active})}>
          <div className="task">
            <div className="task-title" onClick={this.toggleTaskView}>
              <b>{this.props.data.title}</b> - {this.props.data.abstract}
              <Operator
                onPin={()=>{this.handlePin()}} 
                onSnoozed={()=>{this.handleSnoozed()}} 
                onDone={()=>{this.handleDone()}}
                onCreateLabel={()=>this.props.onCreateLabel()}/>
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
            onSnoozed={()=>{this.handleSnoozed()}} 
            onDone={()=>{this.handleDone()}}
            onCreateLabel={()=>this.props.onCreateLabel()}/>
        </div>
      );
    }
  }
});

module.exports = BoxListItem;