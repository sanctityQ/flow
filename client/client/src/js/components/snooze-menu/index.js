import '../popup-menu/index.less';
import './index.less';

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';
import 'whatwg-fetch';
import ClickAway from '../mixins/ClickAway';
import compare from '../util/deepEqual';
import clone from '../util/clone';
import Datepicker from 'rctui/Datepicker';

export default class SnoozeMenu extends ClickAway(Component) {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    // this.getMemberList();
  }

  componentDidMount() {
    this.registerClickAway(this.close, this.refs.menu);
  }

  close() {
    this.setState({active: false});
    this.unbindClickAway();
  }

  open() {
    if (this.state.active) return;
    this.setState({active: true});
    this.bindClickAway();
  }

  render() {
    return (
      <div className={classNames('popup-menu', 'snoooze-menu', {'active': this.state.active})}>
        <header className="popup-menu-header"><span>延后至...</span></header>
        <div className="popup-menu-body">
          <div className="popup-menu-body-list">
            <ul>
              <li className="item">
                <i className="item-img fa fa-sun-o"></i>
                <span className="item-text">今天晚些时候</span>
                <span className="item-text">下午6:00</span>
              </li>
              <li className="item">
                <i className="item-img fa fa-sun-o"></i>
                <span className="item-text">明天</span>
                <span className="item-text">周四 下午6:00</span>
              </li>
              <li className="item">
                <i className="item-img fa fa-sun-o"></i>
                <span className="item-text">本周末</span>
                <span className="item-text">周一 下午6:00</span>
              </li>
              <li className="item">
                <i className="item-img fa fa-sun-o"></i>
                <span className="item-text">下周</span>
                <span className="item-text">周二 下午6:00</span>
              </li>
            </ul>
          </div>
          <div className="popup-menu-body-btn">
            <div className="label-new-icon">
              <i className="item-img fa fa-calendar"></i>
              <Datepicker placeholder={"选择日期和时间"}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}