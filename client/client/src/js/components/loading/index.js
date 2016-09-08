import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loading">
        <span>正在加载…</span>
      </div>
    );
  }
}