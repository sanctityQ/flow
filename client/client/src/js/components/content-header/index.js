require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var ContentHeader = React.createClass({
  render: function() {
    return (
      <section className="content-header">
        <h1>
          Mailbox
          <small>13 new messages</small>
        </h1>
        <ol className="breadcrumb">
          <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
          <li className="active">Mailbox</li>
        </ol>
      </section>
    );
  }
});

module.exports = ContentHeader;