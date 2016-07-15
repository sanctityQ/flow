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
      curIndex: 0,
      leftLabelList: []
    };
  },
  mixins: [Reflux.connect(leftLabelListStore)],
  componentWillMount: function() {
    leftLabelListAction.fetchList();
  },
  handleClick: function(e, index) {
    this.setState({
      curIndex: index
    });
    this.props.onClick();
  },
  getList: function() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">场景</h3>
        </div>
        <div className="box-body no-padding">
          <ul className="nav nav-pills nav-stacked">
            {this.state.leftLabelList.map((item, i)=>{
              return (
                <LeftListItem 
                  isSelected={this.state.curIndex==i} 
                  index={i} data={item} key={i}
                  onClick={(e, index)=>(this.handleClick(e, index))} />
              )
            })}
          </ul>
          <div className="label-new-icon" onClick={this.props.onCreateLabel}>
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