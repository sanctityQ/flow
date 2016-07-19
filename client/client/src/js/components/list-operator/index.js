require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var Select = require('rctui/Select');
var Datepicker = require('rctui/Datepicker');

var CategoryMenu = require('../category-menu');

var ListOperator = React.createClass({
  getInitialState: function() {
    return {
      isPined: false,
      isSnoozed: false,
      isDone: false,
      isCategory: false,
      isShowDatepicker: false
    }
  },
  handlePin: function(event) {
    event.stopPropagation();
    this.props.onPin();
    this.setState({
      isPined: !this.state.isPined
    });
  },
  handleSnoozed: function(event) {
    event.stopPropagation();
    this.props.onSnoozed();
    this.setState({
      isSnoozed: !this.state.isSnoozed,
      isShowDatepicker: true
    });
  },
  handleDone: function(event) {
    event.stopPropagation();
    this.props.onDone();
    this.setState({
      isDone: !this.state.isDone
    });
  },
  handleCategory: function(event) {
    event.stopPropagation();
    this.refs.categoryMenu.open();
    this.setState({
      isCategory: !this.state.isCategory
    });
  },
  render: function() {
    return (
      <div className="mailbox-operation">
        <span className={classNames({'selected': this.state.isPined})} title="固定至收件箱中" 
          onClick={this.handlePin}>
          <i className="iconfont icon-pin"></i>
        </span>
        <span className={classNames('snoozed', {'selected': this.state.isSnoozed})} title="延后至..." 
          onClick={this.handleSnoozed}>
          <i className="iconfont icon-shijian"></i>
          <Datepicker
            onChange={(value) => this.setState({ normal: value })}
            value="16" />
        </span>
        <span className={classNames({'selected': this.state.isDone})} title="标为处理完毕" 
          onClick={this.handleDone}>
          <i className="iconfont icon-queren"></i>
        </span>
        <span title="移到..." className={classNames({'selected': this.state.isCategory})}
          onClick={this.handleCategory} onMouseLeave={()=>{this.refs.categoryMenu.close()}}>
          <i className="iconfont icon-more"></i>
          <CategoryMenu ref="categoryMenu" onCreateLabel={()=>this.props.onCreateLabel()}/>
        </span>
      </div>
    );
  }
});

module.exports = ListOperator;