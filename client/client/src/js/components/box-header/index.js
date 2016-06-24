require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var BoxHeader = React.createClass({
  render: function() {
    return (
      <div className="box-header with-border">
        <h3 className="box-title">{this.props.title}</h3>
      </div>
    );
  }
});

module.exports = BoxHeader;