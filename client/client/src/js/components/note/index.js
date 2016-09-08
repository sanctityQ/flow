import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

export default class Note extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames('task-extra', 'note', {selected: this.props.active})}>
        <div className="inner">
          <div className="wallpaper"></div>
          <textarea className="task-editor" placeholder="任务描述" autoFocus={true}></textarea>
        </div>
      </div>
    );
  }
}