import './index.less';

import React, { Component, PropTypes } from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import TaskDetail from '../task-detail';
import TaskExtra from '../task-extra';
import Operator from '../list-operator';
import Comment from '../comment';
import Portal from '../portal';

import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class PopupTask extends Component {
  static defaultProps = {
    level: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.setState({open: true});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  render() {
    const {open, onRequestClose, container, origin, level, closeContent} = this.props;
    const {title, abstract} = this.props.data;

    let layerElement = (
      <div className="task">
        <div className="task-title" onClick={(e) => onRequestClose(e)}>
          <b>{title}</b> - {abstract}
          <Operator />
        </div>
        <TaskDetail placeholder={title}/>
        <TaskExtra level={level + 1} container={container} origin={origin}/>
        <Comment />
      </div>
    );

    return (
      <div className="task-view">
        {layerElement}
      </div>
    );
  }
}