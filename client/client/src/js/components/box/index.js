require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var BoxHeader = require('../box-header');
var BoxBody = require('../box-body');
var BoxEmpty = require('../box-empty');
var boxStore = require('../../store/boxStore');
var boxAction = require('../../action/boxAction');

var Box = React.createClass({
  getInitialState: function() {
    return {
      boxList: []
    };
  },
  mixins: [Reflux.connect(boxStore)],
  getBoxList: function(eventData) {
    boxAction.fetchList(eventData ? eventData.typeValue : this.props.data.currentTaskType);
  },
  componentWillMount: function() {
    this.getBoxList();
  },
  render: function() {
    return (
      <div className="">
        {this.state.boxList.length ? this.state.boxList.map((item, index)=>{
          return (
            <div className="box box-primary box-item" key={index} >
              <BoxHeader title={item.type} />
              <BoxBody onCreateLabel={()=>this.props.onCreateLabel()} itemList={item.data} ref="boxBody" onClick={this.handleListItemClick} />
            </div>
          )
        }) : <BoxEmpty typeValue={this.props.data.currentTaskType} navbarTitle={this.props.data.navbarTitle} />}
      </div>
    );
  }
});

module.exports = Box;