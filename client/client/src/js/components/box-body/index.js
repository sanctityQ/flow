import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import BoxListItem from '../box-list-item';
import TaskDetail from '../task-detail';
import TaskExtra from '../task-extra';

import FlipMove from 'react-flip-move';

export default class BoxBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTaskView: false, 
      itemList: []
    };
    this.taskTreeData = []
  }

  componentDidMount() {
    //初始化数据
    let setStatus = (item) => {
      item.status = 'close';
      let subtask = item.subtask;
      if (subtask) {
        subtask.forEach((subitem, i) => {
          setStatus(subitem);
        })
      }
    };
    //增加列表折叠状态
    this.setState({
      itemList: this.props.itemList.map((item, i) => {
        setStatus(item);
        return item;
      })
    });
  }

  handleClick() {
    this.setState({
      isShowTaskView: !this.state.isShowTaskView
    });
  }

  changeFoldStatus(level, id) {
    let parentStatus = 'open';
    let changeStatus = (item) => {
      let subtask = item.subtask;
      let status = item.status;
      let parent = item.parent ? item.parent.toString().split('-').map((v, k) => (
        +v
      )) : null;
      let isIncluded = parent ? parent.indexOf(id) > -1 : true;

      //设置点击子任务显示状态
      if (id == item.id) {
        item.status = status == 'open' ? 'close' : 'open';
        parentStatus = item.status;
        item.isSelf = true;
      }

      //设置子任务显示状态
      if (level < item.level && isIncluded) {
        item.status = parentStatus == 'open' ? 'open' : 'close';
        item.isSelf = false;
      }

      if (subtask) {
        subtask.forEach((subitem, i) => {
          changeStatus(subitem);
        })
      }
    };

    let itemList = this.state.itemList.map((item, i) => {
      changeStatus(item);
      return item;
    });

    this.setState({itemList});
  }

  genTree(item) {
    let subtask = item.subtask;
    this.taskTreeData.push(
      <BoxListItem
        changeFoldStatus={() => this.changeFoldStatus(item.level, item.id)}
        onCreateLabel={() => this.props.onCreateLabel()} 
      data={item} key={item.id}/>
    )
    if (subtask) {
      return subtask.map((subitem, i) => {
        return this.genTree(subitem)
      })
    }
  }

  getList() {

    //reset
    this.taskTreeData = [];

    this.state.itemList.forEach((item, i) => {
      this.genTree(item);
    });

    return (
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <div className="table table-hover table-striped">
            <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
              {this.taskTreeData}
            </FlipMove>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.getList();
  }
}