import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import Select from 'rctui/Select';
import Datepicker from 'rctui/Datepicker';
import MemberMenu from '../member-menu';

export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      //是否显示下一步操作
      isShowNextStep: false
    };
  }

  handleNextStep(e) {
    let value = e.target.value.replace(/\s+/g, '');

    this.setState({
      isShowNextStep: !!value.length,
      opacity: !!value.length ? 1 : 0
    });

    this.props.onChange(!value.length);
  }

  changeInvolveMember(list) {
    this.setState({
      involveMemberList: list
    });
  }

  render() {
    return (
      <div className="task-details">
        <div className="title-box">
          <input type="text" defaultValue={this.props.placeholder||""} placeholder="任务标题" autoFocus={true} className="title" onKeyUp={(e) => {this.handleNextStep(e)}}/>
          <span className="plus-button" style={{opacity: this.state.opacity}}>
            <i className="iconfont icon-iconfontadd"></i>
          </span>
        </div>
        <div ref="nextStep" className={classNames('top-level-details', {slideDown: this.state.isShowNextStep})}>
          <span className="folder-selector">
            <Select 
              grid={{width:1/8}}
              placeholder="选择场景"
              optionTpl="<span data-type={type}>{text}</span>"
              valueTpl="<span data-type={type}>{text}</span>"
              fetch={"/api/getStageList"}/>
          </span>
          <span className="time-selector">
            <span>截至时间：</span>
            <Datepicker
              onChange={(value) => this.setState({ normal: value })}
              value="2015-06-21 17:24:03" />
          </span>
          <span className="more-selector">
            <span>参与人员：</span>
            <MemberMenu onChange={(data) => {this.changeInvolveMember(data)}} 
              defaultMember={[{
                avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
                name: '石建国',
                id: 1
              }]} 
            />
          </span>
        </div>
      </div>
    )
  }
}