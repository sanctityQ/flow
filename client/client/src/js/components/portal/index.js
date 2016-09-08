import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
  constructor(props) {
    super(props);
  }

  portalElement: null

  componentDidMount() {
    let container = this.props.container;
    if (!container) {
      container = document.createElement('div');
      container.id = this.props.id;
      document.body.appendChild(container);
    }
    this.portalElement = container;
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }

  componentDidUpdate() {
    ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
  
  render() {
    return null;
  }
}