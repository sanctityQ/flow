require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var BoxListItem = require('../box-list-item');

var boxListStore = require('../../store/boxListStore');
var boxListAction = require('../../action/boxListAction');

var BoxBody = React.createClass({
  defaultListType: 1,
  getListType: function() {
    return sessionStorage.getItem('listType') || this.defaultListType
  },
  getInitialState: function() {
    return {
      boxList: []
    };
  },
  mixins: [Reflux.connect(boxListStore)],
  componentWillMount: function() {
    //页面刷新，重置listType类型
    sessionStorage.setItem('listType', this.defaultListType);
    this.updateList();
  },
  handleClick: function() {
    this.props.onClick();
  },
  updateList: function() {
    boxListAction.fetchList(this.getListType());
  },
  getList: function() {
    return (
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <table className="table table-hover table-striped">
            <tbody>
              {this.state.boxList.map(function(item, i) {
                return (<BoxListItem data={item} key={i} onClick={this.handleClick}/>)
              }.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  render: function() {
    return this.getList();
  }
});

module.exports = BoxBody;