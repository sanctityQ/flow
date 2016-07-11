require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var BoxHeader = require('../box-header');
var BoxBody = require('../box-body');

var boxStore = require('../../store/boxStore');
var boxAction = require('../../action/boxAction');

var Box = React.createClass({
  defaultListType: 1,
  getInitialState: function() {
    return {
      boxList: []
    };
  },
  mixins: [Reflux.connect(boxStore)],
  getListType: function() {
    return sessionStorage.getItem('listType') || this.defaultListType
  },
  getBoxList: function() {
    boxAction.fetchList(this.getListType());
  },
  componentWillMount: function() {
    //页面刷新，重置listType类型
    sessionStorage.setItem('listType', this.defaultListType);
    this.getBoxList();
  },
  render: function() {
    return (
      <div className="">
        {this.state.boxList.map(function(item, index) {
          return (
            <div className="box box-primary box-item" key={index} >
              <BoxHeader title={item.type} />
              <BoxBody itemList={item.data} ref="boxBody" onClick={this.handleListItemClick} />
            </div>
          )
        }.bind(this))}
      </div>
    );
  }
});

module.exports = Box;