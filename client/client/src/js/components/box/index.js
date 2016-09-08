import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import BoxHeader from '../box-header';
import BoxEmpty from '../box-empty';
import BoxBody from '../box-body';
import boxStore from '../../store/boxStore';
import boxAction from '../../action/boxAction';
import Loading from '../loading';

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxList: [],
      loadingStatus: true
    };
  }

  onStatusChange(result) {
    this.setState({
      boxList: result,
      loadingStatus: false
    });
  }

  componentWillMount() {
    this.getBoxList();
  }

  componentDidMount() {
    this.unsubscribe = boxStore.listen((data) => {this.onStatusChange(data)});
  }

  componentWillReceiveProps() {
    // this.setState({loadingStatus: true});
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getBoxList(eventData) {
    boxAction.fetchList(eventData ? eventData.typeValue : this.props.data.currentTaskType);
  }

  render() {

    if (this.state.loadingStatus) {
      return (
        <div><Loading active={this.state.loadingStatus} /></div>
      )
    }

    if (!this.state.boxList.length) {
      return (
        <div>
          <BoxEmpty 
            typeValue={this.props.data.currentTaskType} 
            navbarTitle={this.props.data.navbarTitle} 
          />
        </div>
      )
    }

    return (
      <div>
        {this.state.boxList.map((item, index)=>{
          return (
            <div className={classNames('box box-primary box-item', {'box-snooze': item.type == 'snooze'})} key={index} >
              <BoxHeader title={item.typeName} />
              <BoxBody 
                itemList={item.data} ref="boxBody" 
                onClick={this.handleListItemClick} 
                onCreateLabel={()=>this.props.onCreateLabel()} 
              />
            </div>
          )
        })}
      </div>
    );
  }
}