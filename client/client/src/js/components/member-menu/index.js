require("!style!css!less!./index.less");

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';
import 'whatwg-fetch';
import ClickAway from '../mixins/ClickAway';

class MemberMenu extends ClickAway(Component) {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      selectedIndex: [],
      memberList: []
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

  render() {
    return (
      <div className={classNames('popover', 'member-menu-view', 'bottom', 'in', {'active': this.state.active})} ref="menu">
        <div className="popover-content thin-scroll">
          <div className="menu-input">
            <input className="filter-input form-control" placeholder="查找成员" />
          </div>
          <ul className="list-unstyled thin-scroll">
            <li className="member-item all active">
              <a>
                <i className="fa fa-users"></i>所有成员
              </a>
            </li>
            {this.state.memberList.map((member, i)=>{
              <li className="member-item one hinted">
                <a>
                  <img className="avatar img-circle" src="{member.avatar}"/>
                  <span>{member.name}</span>
                </a>
                <i className="fa fa-check"></i>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = MemberMenu;