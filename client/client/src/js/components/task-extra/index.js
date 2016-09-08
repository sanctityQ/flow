import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import Note from '../note';
import Attachment from '../attachment';
import Subtask from '../subtask';

export default class TaskExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //当前选中的tab
      selectedTab: 'tab-note'
    };
  }

  handleNavClick(event) {
    let nav = event.target.dataset.nav;
    this.setState({selectedTab: nav});
  }

  render() {
    const {container, origin, level} = this.props;

    return (
      <div className="task-extras">
        <div className="tabs">
          <header>
            <span 
              data-nav={"tab-note"} 
              className={classNames('tab-header', {'selected': this.state.selectedTab == 'tab-note'})}
              onClick={(e) => {this.handleNavClick(e)}}>
              <span className="tab-icon">
                <i className="iconfont icon-note"></i>
              </span>
              <span className="tab-label">任务描述</span>
            </span>

            <span 
              data-nav={"tab-attachment"} 
              className={classNames('tab-header', {'selected': this.state.selectedTab == 'tab-attachment'})}
              onClick={(e) => {this.handleNavClick(e)}}>
              <span className="tab-icon">
                <i className="iconfont icon-attachment"></i>
              </span>
              <span className="tab-label">附件</span>
            </span>
            
            <span 
              data-nav={"tab-subTask"} 
              className={classNames('tab-header', {'selected': this.state.selectedTab == 'tab-subTask'})}
              onClick={(e) => {this.handleNavClick(e)}}>
              <span className="tab-icon">
                <i className="iconfont icon-todo"></i>
              </span>
              <span className="tab-label">子任务</span>
            </span>
          </header>

          <section>
            <Note active={this.state.selectedTab == 'tab-note'}/>
            <Attachment active={this.state.selectedTab == 'tab-attachment'}/>
          </section>
        </div>
      </div>
    )
  }
}