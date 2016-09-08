import '../popup-menu/index.less';

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';
import 'whatwg-fetch';
import ClickAway from '../mixins/ClickAway';
import compare from '../util/deepEqual';
import clone from '../util/clone';

class CategoryMenu extends ClickAway(Component) {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    this.getMemberList();
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

  getMemberList() {
    return fetch('/api/getMemberList')
    .then(response=>response.json())
    .then((data)=>(
      this.setState({memberList: data})
    ))
  }

  handleCreateLabel(event) {
    event.stopPropagation();
    this.props.onCreateLabel();
  }

  render() {
    return (
      <div className={classNames('popup-menu', {'active': this.state.active})}>
        <header className="popup-menu-header"><span>移到…</span></header>
        <div className="popup-menu-body">
          <div className="popup-menu-body-list">
            <ul>
              <li className="item">
                <img className="item-img" src="" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="" />
                <span className="item-text">购物</span>
              </li>
            </ul>
          </div>
          <div className="popup-menu-body-btn" onClick={(e)=>{this.handleCreateLabel(e)}}>
            <div className="label-new-icon">
              <i className="iconfont icon-iconfontadd"></i>
              <span>新建...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = CategoryMenu;