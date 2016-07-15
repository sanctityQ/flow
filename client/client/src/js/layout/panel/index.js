require("!style!css!less!./index.less");

var React = require('react');
var Header = require('../../components/header');
var ContenttHeader = require('../../components/content-header');
var Folder = require('../../components/left-folder');
var Label = require('../../components/left-label');

var Box = require('../../components/box');
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
      clickCount: 0,
      skin: 'skin-blue'
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
    this.refs.box.getBoxList();
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
  changeSkin() {
    let type2color = {
      '1': 'skin-blue',
      '2': 'skin-orange',
      '3': 'skin-green'
    };
    let listType = sessionStorage.getItem('listType');

    return this.setState({skin: type2color[listType] || 'skin-blue'})
  },
  render: function() {
    return (
      <div className={classNames('wrapper', 'sidebar-collapse', this.state.skin)} onClick={this.changeSkin}>
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
                <Box ref="box"/>
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