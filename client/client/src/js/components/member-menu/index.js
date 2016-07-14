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
      memberList: [],
      isSelectAll: false
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

  toggleMemberSelected(index) {
    var selectedIndexClone = this.state.selectedIndex;

    if (selectedIndexClone.indexOf(index) > -1) {
      selectedIndexClone = selectedIndexClone.filter((item, i)=>{
        return item !== index;
      });
    } else {
      selectedIndexClone.push(index);
    }

    this.setState({
      selectedIndex: selectedIndexClone,
      isSelectAll: false
    });
  }

  selectAll() {
    this.setState({
      isSelectAll: !this.state.isSelectAll,
      selectedIndex: this.state.isSelectAll ? [] : this.state.memberList.map((v,i)=>(i))
    });
  }

  render() {
    return (
      <div className={classNames('popover', 'member-menu-view', 'bottom', 'in', {'active': this.state.active})} ref="menu">
        <div className="popover-content thin-scroll">
          <div className="menu-input">
            <input className="filter-input form-control" placeholder="查找成员" />
          </div>
          <ul className="list-unstyled thin-scroll">
            <li className={classNames('member-item', 'all', 'active', {'selected': this.state.isSelectAll})} onClick={()=>(this.selectAll())}>
              <a>
                <i className="fa fa-users"></i>所有成员
              </a>
              <i className="fa fa-check"></i>
            </li>
            {this.state.memberList.map((member, i)=>(
              <li className={classNames('member-item', 'one', 'hinted', {'selected': this.state.selectedIndex.indexOf(i) > -1})} key={i} onClick={()=>(this.toggleMemberSelected(i))}>
                <a>
                  <img className="avatar img-circle" src={member.avatar} />
                  <span>{member.name}</span>
                </a>
                <i className="fa fa-check"></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = MemberMenu;