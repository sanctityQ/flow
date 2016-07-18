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
  getInitialState: function() {
    return {
      boxItemList: [],
      isShowTaskView: false
    };
  },
  mixins: [Reflux.connect(boxListStore)],
  handleClick: function() {
    this.setState({
      isShowTaskView: !this.state.isShowTaskView
    });
  },
  getList: function() {
    return (
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <div className="table table-hover table-striped">
            <div>
              {this.props.itemList.map((item, i)=>(
                <BoxListItem data={item} key={i} />
              ))}
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