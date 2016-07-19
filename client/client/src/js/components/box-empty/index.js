require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var BoxEmpty = React.createClass({
  getInitialState() {
    return {
      done: {
        src: './img/done.png',
        body: '您标为处理完毕的内容都会安全地存储在此处。'
      },
      snoozed: {
        src: './img/snoozed.png',
        body: '您延后处理的内容都会转到此处，直到应返回收件箱时。'
      },
      trash: {
        src: './img/trash.png',
        body: '您移到“回收站”的内容将显示在此处。'
      },
      assigned: {
        src: './img/sent.png',
        body: '我分配的的任务将显示在此处。'
      },
      inbox: {
        src: './img/inbox.png',
        body: ''
      },
      other: {
        src: './img/trash.png'
      },
      type2Status: {done: [4], snoozed: [3], trash: [5], assigned: [2],inbox: [1]}
    }
  },
  getStatus(taskType) {
    const type2Status = this.state.type2Status;
    let status = 'other';
    for (let key in type2Status) {
      let item = type2Status[key];
      if (item.indexOf(taskType) > -1) {
        status = key;
        break;
      }
    }
    return status;
  },
  render() {
    let currentTaskType = this.props.typeValue;
    let status = this.getStatus(currentTaskType);
    return (
      <div className={classNames("box-empty", {'box-no-circle': status == 'other'})}>
        <div className="box-empty-circle">
          <div className="box-empty-content">
            <img className="box-empty-icon" src={require(this.state[status].src)} />
            <div className="box-empty-content-title">
              {'“' + this.props.navbarTitle + '”中没有任何内容'}
            </div>
            <div className="box-empty-content-body">
              {status == 'other' ? '您移到“' + this.props.navbarTitle + '”的内容将显示在此处。' : this.state[status].body}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BoxEmpty;