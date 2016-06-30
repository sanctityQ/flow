require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var LabelNew = React.createClass({
  getInitialState: function() {
    return {
      leftLabelList: []
    };
  },
  render: function() {
    return (
      <div className="label-new-panel">
        <div className="lightbox" onClick={this.props.onCloseBtnClick}></div>
        <div className="label-new-dialog">
          <div className="label-new-dialog-body">
            <input className="" placeholder="名称" type="text"/>
            <i className="warn"></i>
          </div>
          <div className="label-new-dialog-ctrl">
            <span className="save disabled" onClick={this.props.onCloseBtnClick}>保存</span>
            <span className="cancel" onClick={this.props.onCloseBtnClick}>取消</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LabelNew;