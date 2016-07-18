require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var LeftListItem = React.createClass({
  getInitialState() {
    return {
      active: false
    }
  },
  handleClick(event, item) {
    event.data = {typeValue: item.type, typeName: item.text};
    this.setState({active: !this.state.active});
  },
  render() {
    let item = this.props.data.self;
    let parentItem = this.props.data.parent;
    return (
      <li className={classNames({'active': item.type == parentItem.currentTaskType})} onClick={(event)=>(this.handleClick(event, item))}>
        <a href="javascript:;">
          <i className={item.className}></i>
          {item.text}
          {item.num ? <span className={item.numClassName}>{item.num}</span> : ''}
        </a>
      </li>
    );
  }
});

module.exports = LeftListItem;