require("!style!css!less!./index.less");

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
      <div className={classNames('popover-category-memu', {'active': this.state.active})}>
        <header className="popover-category-memu-header"><span>移到…</span></header>
        <div className="popover-category-memu-body">
          <div className="popover-category-memu-body-list">
            <ul>
              <li className="item">
                <img className="item-img" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_trash_grey600_18dp_2x.png" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_trash_grey600_18dp_2x.png" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_trash_grey600_18dp_2x.png" />
                <span className="item-text">购物</span>
              </li>
              <li className="item">
                <img className="item-img" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_trash_grey600_18dp_2x.png" />
                <span className="item-text">购物</span>
              </li>
            </ul>
          </div>
          <div className="popover-category-memu-body-btn" onClick={(e)=>{this.handleCreateLabel(e)}}>
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