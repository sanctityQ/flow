require("!style!css!less!./index.less");

var React = require('react');
var Header = require('../../components/header');
var ContenttHeader = require('../../components/content-header');
var Folder = require('../../components/left-folder');
var Label = require('../../components/left-label');
var BoxHeader = require('../../components/box-header');
var BoxBody = require('../../components/box-body');
var Task = require('../../components/task');
var TaskNew = require('../../components/task-new');

var Panel = React.createClass({
  getInitialState: function() {
    return {
      //默认显示的类型列表
      listType: 1,
      isShowModal: false
    };
  },
  handleListItemClick: function() {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  },
  handleTaskNewClick: function() {
    this.setState({
      isShowModal: true
    });
  },
  handleCloseBtnClick: function() {
    this.setState({
      isShowModal: false
    });
  },
  toggleListByType: function(e, type) {
    this.setState({
      listType: type
    });
  },
  render: function() {
    return (
      <div className="wrapper skin-blue sidebar-collapse">
        <Header />
        <div className="content-wrapper">
          <section className="content">
            {this.state.isShowModal ? <Task onCloseBtnClick={this.handleCloseBtnClick}/> : null}
            <div className="row">
              <div className="col-md-3">
                <Folder onClick={this.toggleListByType}/>
                <Label onClick={this.toggleListByType}/>
              </div>
              <div className="col-md-9">
                {["延期", "今日", "昨日"].map(function(item, index) {
                  return (<div className="box box-primary box-item" key={index} listType={this.state.listType}><BoxHeader title={item} /><BoxBody onClick={this.handleListItemClick} /></div>)
                }.bind(this))}
              </div>
            </div>
            <TaskNew onClick={this.handleTaskNewClick}/>
          </section>
        </div>
      </div>
    );
  }
});
module.exports = Panel;