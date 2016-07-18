require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var leftLabelListStore = require('../../store/leftLabelListStore');
var leftLabelListAction = require('../../action/leftLabelListAction');

var LeftListItem = require('../left-list-item/');

var Label = React.createClass({
  getInitialState: function() {
    return {
      leftLabelList: []
    };
  },
  mixins: [Reflux.connect(leftLabelListStore)],
  componentWillMount: function() {
    leftLabelListAction.fetchList();
  },
  stopPropagation(event) {
    event.stopPropagation();
  },
  handleCreateLabel(event) {
    this.stopPropagation(event);
    this.props.onCreateLabel();
  },
  getList: function() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border" onClick={this.stopPropagation}>
          <h3 className="box-title">场景</h3>
        </div>
        <div className="box-body no-padding">
          <ul className="nav nav-pills nav-stacked">
            {this.state.leftLabelList.map((item, i)=>{
              return (<LeftListItem data={{self: item, parent: this.props.data}} key={i} />)
            })}
          </ul>
          <div className="label-new-icon" onClick={(e)=>(this.handleCreateLabel(e))}>
            <i className="iconfont icon-iconfontadd"></i>新建...
          </div>
        </div>
      </div>
    );
  },
  render: function() {
    return this.getList();
  }
});

module.exports = Label;