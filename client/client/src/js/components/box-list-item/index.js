require("!style!css!less!./index.less");

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Operator from '../list-operator';
import PopupTask from '../popup-task';
import Subtask from '../subtask';

export default class BoxListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEdit: false
    };
  }

  showOperator() {
    if (this.state.open) return;
    this.refs.operator.show();
  }

  hideOperator() {
    if (this.state.open) return;
    this.refs.operator.hide();
  }

  componentWillReceiveProps() {

  }

  closePopupTask(e) {
    e.stopPropagation();
    this.setState({isEdit: false});
  }

  openPopupTask() {
    if (this.state.isEdit) return;
    this.setState({isEdit: true});
  }

  toggleFold(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open
    });
    this.props.changeFoldStatus();
  }

  render() {
    const {abstract, title, name, id, level, status, subtask, isSelf} = this.props.data;
    const {container, origin} = this.props;

    let content = (
      <div className="list-content">
        <span
          className={classNames('fa', {
            'fa-angle-right': status == 'close',
            'fa-angle-down': status == 'open',
            'hidden': subtask ? !subtask.length : true
          })} 
          onClick={(e) => this.toggleFold(e)}>
        </span>
        <span className="mailbox-avatar" title={name.slice(0, 1)}></span>
        <span className="mailbox-name"><a href="read-mail.html">{name}</a></span>
        <span className="mailbox-subject">
          <b>{title}</b> - {abstract}
        </span>
        <Operator ref="operator"/>
      </div>
    );

    //列表缩进的class
    let indentClassName = 'indent_' + level;
    //判断任务是否隐藏
    let isHide = () => {
      return !isSelf && status == 'close' && level != 1
    };

    //任务编辑弹窗视图
    let openContent = (
      <PopupTask 
        data={this.props.data} 
        level={level} 
        container={container} 
        origin={origin}
        onRequestClose={(e) => this.closePopupTask(e)}>
      </PopupTask>
    );

    return (
      <div ref="listItem"
        id={id}
        className={classNames('list-item', indentClassName, {hide: isHide()})}
        onClick={() => {this.openPopupTask()}} 
        onMouseOver={()=>{this.showOperator()}}
        onMouseLeave={()=>{this.hideOperator()}}>
        {this.state.isEdit ? openContent : content}
      </div>
    );
  }
}