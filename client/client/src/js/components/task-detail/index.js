require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var Select = require('rctui/Select');
var Datepicker = require('rctui/Datepicker');
var classNames = require('classnames');

var MemberMenu = require('../member-menu');

var TaskDetail = React.createClass({
  getInitialState: function() {
    return {
      opacity: 0,
      //是否显示下一步操作
      isShowNextStep: false
    };
  },
  handleNextStep: function(e) {
    var value = e.target.value.replace(/\s+/g, '');

    this.setState({
      isShowNextStep: !!value.length,
      opacity: !!value.length ? 1 : 0
    });

    this.props.onChange(!value.length);
  },
  showMemberMenu: function() {
    this.refs.menu.open();
  },
  render: function() {
    return (
      <div className="task-details">
        <div className="title-box">
          <input type="text" defaultValue={this.props.placeholder||""} placeholder="任务标题" autofocus="autofocus" className="title" onKeyUp={this.handleNextStep}/>
          <span className="plus-button" style={{opacity: this.state.opacity}}>
            <i className="iconfont icon-iconfontadd"></i>
          </span>
        </div>
        <div ref="nextStep" className={classNames('top-level-details', {slideDown: this.state.isShowNextStep})}>
          <span className="folder-selector">
            <Select grid={{width:1/8}}
              placeholder="选择场景"
              data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />
          </span>
          <span className="time-selector">
            <Datepicker
              onChange={(value) => this.setState({ normal: value })}
              value="2015-06-21 17:24:03" />
          </span>
          <span className="more-selector">
            <ul className="involve-members clearfix">
              <li className="involve-member">
                <img className="avatar" src="https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100" />
              </li>
              <li className="involve-member-add">
                <a className="add-involvement-handler clearfix" onClick={this.showMemberMenu}>
                  <span className="iconfont icon-iconfontadd" title="添加参与者"></span> 
                </a>
                <MemberMenu ref="menu"/>
              </li>
            </ul>
          </span>
        </div>
      </div>
    )
  }
});

module.exports = TaskDetail;