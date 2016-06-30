require("!style!css!less!./index.less");

var React = require('react');
var Header = require('../../components/header');
var ContenttHeader = require('../../components/content-header');
var Folder = require('../../components/left-folder');
var Label = require('../../components/left-label');
var BoxHeader = require('../../components/box-header');
var BoxBody = require('../../components/box-body');
var Task = require('../../components/task');
var TaskNew = require('../../components/task-new');
var LabelNew = require('../../components/left-label-new');
var classNames = require('classnames');

var Panel = React.createClass({
  getInitialState: function() {
    return {
      isShowModal: false,
      isCreateLabel: false,
      bounceOutLeft: false,
      bounceInLeft: false,
      clickCount: 0
    };
  },
  handleListItemClick: function() {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  },
  handleTaskNewClick: function() {
    this.setState({
      isShowModal: true
    });
  },
  handleCloseBtnClick: function() {
    this.setState({
      isShowModal: false
    });
  },
  toggleListByType: function() {
    this.refs.boxBody.updateList();
  },
  createLabelDialog: function() {
    this.setState({
      isCreateLabel: true
    });
  },
  closeLabelDialog: function() {
    this.setState({
      isCreateLabel: false
    });
  },
  handleHeaderClick: function(clickCount) {
    this.setState({
      bounceOutLeft: clickCount % 2 == 0,
      bounceInLeft: clickCount % 2 !== 0,
      clickCount: ++clickCount
    })
  },
  render: function() {
    return (
      <div className="wrapper skin-blue sidebar-collapse">
        <Header onHeaderClick={()=>(this.handleHeaderClick(this.state.clickCount))}/>
        <div className="content-wrapper">
          <section className="content">
            {this.state.isShowModal ? <Task onCloseBtnClick={this.handleCloseBtnClick}/> : null}
            {this.state.isCreateLabel ? <LabelNew onCloseBtnClick={this.closeLabelDialog}/> : null}
            <div className="row">
              <div className={classNames('col-md-3', 'animated', {'bounceOutLeft': this.state.bounceOutLeft, 'bounceInLeft': this.state.bounceInLeft})}>
                <Folder onClick={this.toggleListByType}/>
                <Label onClick={this.toggleListByType} onCreateLabel={this.createLabelDialog}/>
              </div>
              <div className={classNames({'col-md-9': !this.state.bounceOutLeft, 'col-md-12': this.state.bounceOutLeft})}>
                {["延期", "今日", "昨日"].map(function(item, index) {
                  return (<div className="box box-primary box-item" key={index} ><BoxHeader title={item} /><BoxBody ref="boxBody" onClick={this.handleListItemClick} /></div>)
                }.bind(this))}
              </div>
            </div>
            <TaskNew onClick={this.handleTaskNewClick}/>
          </section>
        </div>
      </div>
    );
  }
});
module.exports = Panel;