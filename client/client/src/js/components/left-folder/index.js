require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var leftFolderListStore = require('../../store/leftFolderListStore');
var leftFolderListAction = require('../../action/leftFolderListAction');

var LeftListItem = require('../left-list-item/');

var Folder = React.createClass({
  getInitialState: function() {
    return {
      curIndex: 0,
      leftFolderList: []
    };
  },
  mixins: [Reflux.connect(leftFolderListStore)],
  componentWillMount: function() {
    leftFolderListAction.fetchList();
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
        <div className="box-body no-padding">
          <ul className="nav nav-pills nav-stacked">
            {this.state.leftFolderList.map(function(item, i) {
              return (<LeftListItem isSelected={this.state.curIndex==i} index={i} data={item} key={i} onClick={(e, index)=>(this.handleClick(e, index))}/>)
            }.bind(this))}
          </ul>
        </div>
      </div>
    );
  },
  render: function() {
    return this.getList();
  }
});

module.exports = Folder;