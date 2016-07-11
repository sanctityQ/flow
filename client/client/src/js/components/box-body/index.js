require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var BoxListItem = require('../box-list-item');

var boxListStore = require('../../store/boxListStore');
var boxListAction = require('../../action/boxListAction');

var TaskDetail = require('../task-detail');
var TaskExtra = require('../task-extra');

var BoxBody = React.createClass({
  defaultListType: 1,
  getListType: function() {
    return sessionStorage.getItem('listType') || this.defaultListType
  },
  getInitialState: function() {
    return {
      boxItemList: [],
      isShowTaskView: false
    };
  },
  mixins: [Reflux.connect(boxListStore)],
  componentWillMount: function() {
    //页面刷新，重置listType类型
    // sessionStorage.setItem('listType', this.defaultListType);
    // this.updateList();
  },
  handleClick: function() {
    this.setState({
      isShowTaskView: !this.state.isShowTaskView
    });
  },
  updateList: function() {
    boxListAction.fetchList(this.getListType());
  },
  getList: function() {
    return (
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <div className="table table-hover table-striped">
            <div>
              {this.props.itemList.map(function(item, i) {
                return (<BoxListItem data={item} key={i} />)
              }.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  render: function() {
    return this.getList();
  }
});

module.exports = BoxBody;