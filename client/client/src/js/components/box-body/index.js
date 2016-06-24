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
    
  },
  getList: function() {
    return (
      <div className="box-body no-padding">
        <div className="table-responsive mailbox-messages">
          <table className="table table-hover table-striped">
            <tbody>
              {this.state.boxList.map(function(item, i) {
                return (<BoxListItem data={item} key={i} onClick={this.props.onClick}/>)
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