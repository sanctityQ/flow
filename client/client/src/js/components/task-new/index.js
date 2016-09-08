import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import TaskDetail from '../task-detail';

export default class TaskNew extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className="task-new">
        <div className="task-new-icon" onClick={(e) => {this.handleClick(e)}}>
          <i className="iconfont icon-iconfontadd"></i>
        </div>
      </div>
    )
  }
}