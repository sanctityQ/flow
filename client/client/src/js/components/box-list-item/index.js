require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var BoxListItem = React.createClass({
  getInitialState: function() {
    return {
      isChecked: false
    }
  },
  handleCheckboxClick: function(event) {
    event.stopPropagation();
    this.setState({
      isChecked: !this.state.isChecked
    });
  },
  render: function() {
    return (
      <tr onClick={this.props.onClick}>
        <td>
          <div className={this.state.isChecked ? 'icheckbox_flat-blue checked' : 'icheckbox_flat-blue'} onClick={this.handleCheckboxClick}></div>
        </td>
        <td className="mailbox-star"><a href="#"><i className="fa fa-star text-yellow"></i></a></td>
        <td className="mailbox-name"><a href="read-mail.html">{this.props.data.name}</a></td>
        <td className="mailbox-subject"><b>{this.props.data.title}</b> - {this.props.data.abstract}
        </td>
        <td className="mailbox-attachment"></td>
        <td className="mailbox-date">{this.props.data.time}</td>
      </tr>
    );
  }
});

module.exports = BoxListItem;