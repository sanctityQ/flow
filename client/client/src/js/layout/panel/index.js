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
      //默认皮肤
      skin: 'skin-blue',
      //当前选中的列表类型
      currentTaskType: 1,
      //当前选中的类型文本
      navbarTitle: '收件箱'
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
  toggleListByType: function(event) {
    let eventData = event.data;
    this.refs.box.getBoxList(eventData);
    this.changeSkin(eventData.typeValue);
    this.setState({currentTaskType: eventData.typeValue, navbarTitle: eventData.typeName});
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
  changeSkin(taskType) {
    let type2color = {
      1: 'skin-blue',
      2: 'skin-grey',
      3: 'skin-orange',
      4: 'skin-green'
    };

    return this.setState({skin: type2color[taskType] || 'skin-grey'})
  },
  render: function() {
    return (
      <div className={classNames('wrapper', 'sidebar-collapse', this.state.skin)}>
        <Header navbarTitle={this.state.navbarTitle} onHeaderClick={()=>(this.handleHeaderClick(this.state.clickCount))}/>
        <div className="content-wrapper">
          <section className="content">
            {this.state.isShowModal ? <Task onCloseBtnClick={this.handleCloseBtnClick}/> : null}
            {this.state.isCreateLabel ? <LabelNew onCloseBtnClick={this.closeLabelDialog}/> : null}
            <div className="row">
              <div onClick={this.toggleListByType} className={classNames('col-md-3', 'animated', {'bounceOutLeft': this.state.bounceOutLeft, 'bounceInLeft': this.state.bounceInLeft})}>
                <Folder data={{currentTaskType: this.state.currentTaskType}}/>
                <Label onCreateLabel={()=>this.createLabelDialog()} data={{currentTaskType: this.state.currentTaskType}}/>
              </div>
              <div className={classNames({'col-md-9': !this.state.bounceOutLeft, 'col-md-12': this.state.bounceOutLeft})}>
                <Box onCreateLabel={()=>this.createLabelDialog()} data={{currentTaskType: this.state.currentTaskType, navbarTitle: this.state.navbarTitle}} ref="box"/>
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