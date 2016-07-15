import 'whatwg-fetch';
import Reflux from 'reflux';
import leftLabelListAction from '../action/leftLabelListAction';

var leftLabelListStore = Reflux.createStore({
  listenables: [leftLabelListAction],
  leftLabelList: [],
  onSetCheckboxStyle: function() {
  },
  onSaveLabel: function(labelTitle) {
    this.leftLabelList.push({
      className: 'fa fa-circle-o text-red',
      text: labelTitle
    });
    this.trigger({
      leftLabelList: this.leftLabelList
    });
  },
  onFetchList: function() {
    fetch('/api/getStageList')
    .then(response=>response.json())
    .then((data)=>{
      this.leftLabelList = data;
      this.trigger({
        leftLabelList: this.leftLabelList
      });
    });
  }
});

module.exports = leftLabelListStore;