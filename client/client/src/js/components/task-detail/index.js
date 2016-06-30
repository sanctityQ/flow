require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var Select = require('rctui/Select');
var Datepicker = require('rctui/Datepicker');
var classNames = require('classnames');

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
  render: function() {
    return (
      <div className="task-details">
        <div className="title-box">
          <input type="text" placeholder="任务标题" autofocus="autofocus" className="title" onKeyUp={this.handleNextStep}/>
          <span className="plus-button" style={{opacity: this.state.opacity}}>
            <i className="iconfont icon-zengjia"></i>
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
          <span className="grey-seperator"></span>
          <span className="alert-selector">
            <i className="iconfont icon-tixing"></i>
          </span>
          <span className="grey-seperator"></span>
          <span className="priority-selector">
            <i className="iconfont icon-shoucang"></i>
          </span>
          <span className="grey-seperator"></span>
          <span className="more-selector">
            <i className="iconfont icon-yonghu"></i>
            <i className="iconfont icon-gengduo"></i>
          </span>
        </div>
      </div>
    )
  }
});

module.exports = TaskDetail;