require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var leftFolderListStore = require('../../store/leftFolderListStore');
var leftFolderListAction = require('../../action/leftFolderListAction');

var LeftListItem = require('../left-item/');

var Folder = React.createClass({
  getInitialState: function() {
    return {
      leftFolderList: []
    };
  },
  mixins: [Reflux.connect(leftFolderListStore)],
  componentWillMount: function() {
    leftFolderListAction.fetchList();
  },
  getList: function() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Folders</h3>
          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse">
              <i className="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="box-body no-padding">
          <ul className="nav nav-pills nav-stacked">
            {this.state.leftFolderList.map(function(item, i) {
              return (<LeftListItem data={item} key={i}/>)
            })}
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