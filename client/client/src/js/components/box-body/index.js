require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var BoxListItem = require('../box-list-item');

var boxListStore = require('../../store/boxListStore');
var boxListAction = require('../../action/boxListAction');

var BoxBody = React.createClass({
  getInitialState: function() {
    return {
      boxList: []
    };
  },
  mixins: [Reflux.connect(boxListStore)],
  componentWillMount: function() {
    boxListAction.fetchList();
  },
  componentDidMount: function() {
    boxListAction.setCheckboxStyle();
  },
  getList: function() {
    boxListAction.setCheckboxStyle();
    return (
      <div className="box-body no-padding">
        <div className="mailbox-controls">
          <button type="button" className="btn btn-default btn-sm checkbox-toggle">
            <i className="fa fa-square-o"></i>
          </button>
          <div className="btn-group">
            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o"></i></button>
            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-reply"></i></button>
            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-share"></i></button>
          </div>
        </div>
        <div className="table-responsive mailbox-messages">
          <table className="table table-hover table-striped">
            <tbody>
              {this.state.boxList.map(function(item, i) {
                return (<BoxListItem data={item} key={i} />)
              })}
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