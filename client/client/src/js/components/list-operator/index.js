import './index.less';

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import CategoryMenu from '../category-menu';
import SnoozeMenu from '../snooze-menu';
import ClickAway from '../mixins/ClickAway';

export default class ListOperator extends ClickAway(Component) {
  constructor(props) {
    super(props);
    this.state = {
      isPined: false,
      isSnoozed: false,
      isDone: false,
      isCategory: false,
      active: false
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    if (this.state.active) return;
    this.setState({active: true});
    this.bindClickAway();
  }

  hide() {
    setTimeout(()=>{
      if (this.refs.snoozeMenu.state.active || this.refs.categoryMenu.state.active) return;
      this.setState({active: false});
      this.unbindClickAway();
    }, 0)
  }

  componentDidMount() {
    this.registerClickAway(this.hide, this.refs.operation);
  }

  handlePin(event) {
    // this.props.onPin();
    this.setState({
      isPined: !this.state.isPined
    });
  }

  handleSnoozed(event) {
    // this.props.onSnoozed();
    this.refs.snoozeMenu.open();
  }

  handleDone(event) {
    // this.props.onDone();
    this.setState({
      isDone: !this.state.isDone
    });
  }

  openCategoryMenu(event) {
    this.refs.categoryMenu.open();
  }

  handleOperation(event) {
    event.stopPropagation();
    this.setState({active: true});
  }

  render() {
    return (
      <div ref="operation" className={classNames('mailbox-operation', {'active': this.state.active})} onClick={(e)=>{this.handleOperation(e)}}>
        <span title="节点关系图" tabIndex={0}>
          <a href="/#/tree" target="_blank"><i className="iconfont icon-tree"></i></a>
        </span>
        <span className={classNames({'selected': this.state.isPined})} title="固定至收件箱中" tabIndex={0}
          onClick={(e)=>{this.handlePin(e)}}>
          <i className="iconfont icon-pin"></i>
        </span>
        <span className={classNames('snoozed', {'selected': this.state.isSnoozed})} title="延后至..." tabIndex={0}
          onClick={(e)=>{this.handleSnoozed(e)}}>
          <i className="iconfont icon-shijian"></i>
          <SnoozeMenu ref="snoozeMenu"/>
        </span>
        <span className={classNames({'selected': this.state.isDone})} title="标为处理完毕" tabIndex={0}
          onClick={(e)=>{this.handleDone(e)}}>
          <i className="iconfont icon-queren"></i>
        </span>
        <span title="移到..." tabIndex={0} className={classNames({'selected': this.state.isCategory})}
          onClick={(e)=>{this.openCategoryMenu(e)}}>
          <i className="iconfont icon-more"></i>
          <CategoryMenu ref="categoryMenu" onCreateLabel={()=>this.props.onCreateLabel()}/>
        </span>
      </div>
    );
  }
}