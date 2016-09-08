import './index.less';

import React, { Component, PropTypes } from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

import TaskDetail from '../task-detail';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {opacity: 1};
  }

  componentWillMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  //切换关闭按钮是否显示
  toggleCloseBtn(titleLength) {
    this.setState({
      opacity: +!!titleLength
    });
  }

  //阻止冒泡
  handleClick(event) {
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
  }

  renderLayer() {
    const {open, className, onRequestClose} = this.props;

    if (open) {

      if (!this.layer) {
        this.layer = document.createElement('div');
        this.layer.className = className;
        document.body.appendChild(this.layer);
      }

      let layerElement = (
        <div className="task-panel" onClick={this.handleClick}>
          <div className="lightbox" onClick={() => {onRequestClose()}}></div>
          <div className="task">
            <TaskDetail onChange={(title) => {this.toggleCloseBtn(title)}}/>
          </div>
          <div className="close-button" onClick={() => {onRequestClose()}} style={{opacity: this.state.opacity}}>
            <i className="iconfont icon-guanbi"></i>
          </div>
        </div>
      );
      
      this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
    } else {
      this.unrenderLayer();
    }
  }

  unrenderLayer() {
    if (!this.layer) return;
    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  render() {
    return null;
  }
}