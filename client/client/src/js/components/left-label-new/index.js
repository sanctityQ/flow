require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var classNames = require('classnames');

var labelListStore = require('../../store/leftLabelListStore');
var labelListAction = require('../../action/leftLabelListAction');

var LabelNew = React.createClass({
  getInitialState: function() {
    return {
      leftLabelList: [],
      labelTitle: '',
      isDisabled: false,
      isWarned: false
    };
  },
  mixins: [Reflux.connect(labelListStore)],
  saveLabel: function() {
    if (this.state.labelTitle.length < 1) return;
    labelListAction.saveLabel(this.state.labelTitle);
    this.props.onCloseBtnClick();
  },
  handleChange: function(event) {
    var value = event.target.value;
    this.setState({
      labelTitle: value,
      isDisabled: value.length < 1,
      isWarned: value.length < 1
    });
  },
  render: function() {
    return (
      <div className="label-new-panel">
        <div className="lightbox" onClick={this.props.onCloseBtnClick}></div>
        <div className="label-new-dialog">
          <div className={classNames('label-new-dialog-body', {warned: this.state.isWarned})}>
            <input placeholder="名称" type="text" onChange={this.handleChange}/>
            <i className="warn"></i>
          </div>
          <div className="label-new-dialog-ctrl">
            <span className={classNames('save', {disabled: this.state.isDisabled})} onClick={this.saveLabel}>保存</span>
            <span className="cancel" onClick={this.props.onCloseBtnClick}>取消</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LabelNew;