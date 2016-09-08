import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import Task from '../task';
import BoxListItem from '../box-list-item';

import handleWheel from '../inspect-wheel';
import * as Dom from '../util/dom';

export default class Subtask extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  //关闭任务创建窗口
  closeCreateTaskDialog() {
    this.setState({
      open: false
    });
  }

  //打开任务创建窗口
  openCreateTaskDialog() {
    this.setState({
      open: true
    });
  }

  componentDidUpdate() {
    this.resetPosition();
  }

  componentDidMount() {
    this.resetPosition();
  }

  //重置弹窗位置
  resetPosition() {
    let subtaskEle = this.refs.subtask;
    let offset = Dom.offset(subtaskEle);
    let height = Dom.getOuterHeight(subtaskEle);
    let scrollTop = Dom.getScrollTop();
    let clientHeight = document.body.clientHeight;

    document.body.scrollTop = offset.top - 0.3 * clientHeight;
  }

  render() {
    const {container, origin, level, onRequestClose} = this.props;

    return (
      <div className="subtask-body" ref="subtask">
        <header className="subtask-header" onClick={(e)=>onRequestClose(e)}><div className="subtask-name">h5邀请好友</div></header>
        <div className="subtask-list">
          <div className="inner">
            <div className="new-subtask" onClick={() => {this.openCreateTaskDialog()}}>
              <span className="plus-button iconfont icon-iconfontadd" title="添加子任务"></span>
              <span>添加子任务</span>
              <Task 
                open={this.state.open} 
                className="react-dialog" 
                onRequestClose={() => {this.closeCreateTaskDialog()}}
              />
            </div>
            <div>
              {this.props.itemList.map((item, i)=>(
                <BoxListItem level={level + 1} container={container} origin={origin} onCreateLabel={()=>this.props.onCreateLabel()} data={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}