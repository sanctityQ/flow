require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var TaskDetail = require('../task-detail');
var TaskExtra = require('../task-extra');

var BoxListItem = React.createClass({
  getInitialState: function() {
    return {
      isChecked: false,
      isShowTaskView: false
    }
  },
  handleCheckboxClick: function(event) {
    event.stopPropagation();
    this.setState({
      isChecked: !this.state.isChecked
    });
  },
  toggleTaskView: function() {
    this.setState({
      isShowTaskView: !this.state.isShowTaskView
    });
  },
  handleChange: function() {

  },
  render: function() {
    if (this.state.isShowTaskView) {
      return (
        <div className="task-view">
          <div className="task">
            <div className="task-title" onClick={this.toggleTaskView}>
              <b>{this.props.data.title}</b> - {this.props.data.abstract}
            </div>
            <TaskDetail onChange={this.handleChange} placeholder={this.props.data.title}/>
            <TaskExtra />
          </div>
        </div>
      );
    } else {    
      return (
        <div onClick={this.toggleTaskView} className="list-item">
          <span className="mailbox-checkbox">
            <div className={this.state.isChecked ? 'icheckbox_flat-blue checked' : 'icheckbox_flat-blue'} onClick={this.handleCheckboxClick}></div>
          </span>
          <span className="mailbox-name"><a href="read-mail.html">{this.props.data.name}</a></span>
          <span className="mailbox-subject"><b>{this.props.data.title}</b> - {this.props.data.abstract}
          </span>
          <span className="mailbox-operation"></span>
        </div>
      );
    }
  }
});

module.exports = BoxListItem;