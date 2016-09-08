import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import Operator from '../list-operator';

export default class SubtaskListItem extends Component {
  constructor(props) {
    super(props);
  }

  showOperator() {
    this.refs.operator.show();
  }

  hideOperator() {
    this.refs.operator.hide();
  }

  render() {
    let subtask = this.props.data;
    return (
      <li key={subtask.id} 
        className="task task-item"
        onMouseOver={()=>{this.showOperator()}}
        onMouseLeave={()=>{this.hideOperator()}}>
        <div className="task-container">
          <div className="title">
            {subtask.name}
          </div>
          <Operator ref="operator"
            onPin={function() {}} 
            onSnoozed={function() {}} 
            onDone={function() {}}
            onCreateLabel={function() {}}/>
        </div>
      </li>
    );
  }
} 