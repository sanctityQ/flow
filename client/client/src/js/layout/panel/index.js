import './index.less';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Box from '../../components/box';
import Header from '../../components/header';
import ContenttHeader from '../../components/content-header';
import Folder from '../../components/left-folder';
import Label from '../../components/left-label';
import Task from '../../components/task';
import TaskNew from '../../components/task-new';
import LabelNew from '../../components/left-label-new';

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isCreateLabel: false,
      bounceOutLeft: false,
      bounceInLeft: false,
      //任务列表是否展开
      isSpread: false,
      clickCount: 0,
      //默认皮肤
      skin: 'skin-blue',
      //当前选中的列表类型
      currentTaskType: 1,
      //当前选中的类型文本
      navbarTitle: '收件箱'
    };
  }

  openCreateTaskDialog() {
    this.setState({
      open: true
    });
  }

  closeCreateTaskDialog() {
    this.setState({
      open: false
    });
  }

  toggleListByType(event) {
    let eventData = event.data;
    if (!eventData) return;
    this.refs.box.getBoxList(eventData);
    this.changeSkin(eventData.typeValue);
    this.setState({currentTaskType: eventData.typeValue, navbarTitle: eventData.typeName});
  }

  createLabelDialog() {
    this.setState({
      isCreateLabel: true
    });
  }

  closeLabelDialog() {
    this.setState({
      isCreateLabel: false
    });
  }

  handleHeaderClick(clickCount) {
    this.setState({
      bounceOutLeft: clickCount % 2 == 0,
      bounceInLeft: clickCount % 2 !== 0,
      clickCount: ++clickCount
    });

    if (!this.state.bounceOutLeft) {
      setTimeout(() => {
        this.refs.sidebar.style.display = 'none';
        this.setState({isSpread: true})
      }, 500)
    } else {
      this.refs.sidebar.style.display = 'block';
      this.setState({isSpread: false});
    }
  }

  changeSkin(taskType) {
    const type2color = {
      1: 'skin-blue',
      2: 'skin-grey',
      3: 'skin-orange',
      4: 'skin-green'
    };

    return this.setState({skin: type2color[taskType] || 'skin-grey'})
  }

  render() {
    return (
      <div className={classNames('wrapper', 'sidebar-collapse', this.state.skin)}>
        <Header navbarTitle={this.state.navbarTitle} onHeaderClick={()=>(this.handleHeaderClick(this.state.clickCount))}/>
        <div className="content-wrapper">
          <section className="content">
            <Task 
              open={this.state.open} 
              className="react-dialog" 
              onRequestClose={() => {this.closeCreateTaskDialog()}}
            />
            {this.state.isCreateLabel ? <LabelNew onCloseBtnClick={()=>{this.closeLabelDialog()}}/> : null}
            <div className="row">
              <div ref="sidebar" onClick={(e)=>{this.toggleListByType(e)}} className={classNames('col-md-2', 'animated', {'bounceOutLeft': this.state.bounceOutLeft, 'bounceInLeft': this.state.bounceInLeft})}>
                <Folder data={{currentTaskType: this.state.currentTaskType}}/>
                <Label onCreateLabel={()=>this.createLabelDialog()} data={{currentTaskType: this.state.currentTaskType}}/>
              </div>
              <div className={classNames({'col-md-10': !this.state.isSpread, 'col-md-12': this.state.isSpread})}>
                <Box onCreateLabel={()=>this.createLabelDialog()} data={{currentTaskType: this.state.currentTaskType, navbarTitle: this.state.navbarTitle}} ref="box"/>
              </div>
            </div>
            <TaskNew onClick={(e)=>{this.openCreateTaskDialog(e)}}/>
          </section>
        </div>
      </div>
    );
  }
}