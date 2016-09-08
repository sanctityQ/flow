import './index.less';

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';
import 'whatwg-fetch';

import ClickAway from '../mixins/ClickAway';
import compare from '../util/deepEqual';
import clone from '../util/clone';
import handleWheel from '../inspect-wheel';

import FlipMove from 'react-flip-move';

export default class MemberMenu extends ClickAway(Component) {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      selectedMemberIds: this.props.defaultMember.map((v, i)=>(v.id)),
      memberList: [],
      isSelectAll: false,
      //参与人员
      involveMemberList: this.props.defaultMember || []
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
      this.setState({memberList: data, originMemberList: data})
    ))
  }

  isHasMember(member) {
    return this.props.defaultMember.filter((item, index)=>{
      return compare(item, member);
    }).length > 0;
  }

  filterMember(e) {
    let keyword = e.target.value;
    let filterMembers  = this.state.originMemberList.filter((item, index)=>{
      return keyword == '' ? true : item.name.indexOf(keyword) > -1;
    });
    this.setState({memberList: filterMembers});
  }

  toggleMemberSelected(member, index) {
    let selectedMemberIdsClone = clone(this.state.selectedMemberIds);
    let involveMemberListClone = clone(this.state.involveMemberList);
    let memberId = member.id;

    if (this.isHasMember(member)) return;

    if (selectedMemberIdsClone.indexOf(memberId) > -1) {
      selectedMemberIdsClone = selectedMemberIdsClone.filter((item, i)=>{
        return item !== memberId;
      });
      involveMemberListClone = involveMemberListClone.filter((item, i)=>{
        return item.id !== memberId;
      });
    } else {
      selectedMemberIdsClone.push(memberId);
      involveMemberListClone.push(member);
    }

    this.setState({
      selectedMemberIds: selectedMemberIdsClone,
      involveMemberList: involveMemberListClone,
      isSelectAll: false
    });
  }

  selectAll() {
    this.setState({
      isSelectAll: !this.state.isSelectAll,
      selectedMemberIds: this.state.isSelectAll ? clone(this.props.defaultMember.map((v,i)=>(v.id))) : this.state.memberList.map((v,i)=>(v.id)),
      involveMemberList: this.state.isSelectAll ? clone(this.props.defaultMember) : this.state.memberList
    });
  }

  render() {
    return (
      <div className="popover-memu">
        <FlipMove typeName="ul" 
          enterAnimation="elevator" 
          leaveAnimation="fade" 
          className="involve-members clearfix">
          {this.state.involveMemberList.map((member, index)=>{
            return (
              <li className="involve-member" key={index} id={index}>
                <img className="avatar" src={member.avatar} />
              </li>
            )
          })}
          <li id={this.state.involveMemberList.length + 1} className="involve-member-add">
            <a className="add-involvement-handler clearfix" onClick={()=>(this.open())}>
              <span className="iconfont icon-iconfontadd" title="添加参与者"></span> 
            </a>
          </li>
        </FlipMove>
        <div className={classNames('popover', 'member-menu-view', 'bottom', 'in', {'active': this.state.active})} ref="menu">
          <div className="popover-content thin-scroll">
            <div className="menu-input">
              <input onChange={(e) => this.filterMember(e)} className="filter-input form-control" placeholder="查找成员" />
            </div>
            <ul className="list-unstyled thin-scroll" onWheel={(e) => {handleWheel(e)}}>
              <li className={classNames('member-item', 'all', 'active', {'selected': this.state.isSelectAll})} onClick={()=>(this.selectAll())}>
                <a>
                  <i className="fa fa-users"></i>所有成员
                </a>
                <i className="fa fa-check"></i>
              </li>
              {this.state.memberList.map((member, i)=>(
                <li className={classNames('member-item', 'one', 'hinted', {'selected': this.state.selectedMemberIds.indexOf(member.id) > -1})} key={i} onClick={()=>(this.toggleMemberSelected(member))}>
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
      </div>
    )
  }
}