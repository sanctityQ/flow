import 'whatwg-fetch';
import Reflux from 'reflux';
import leftLabelListAction from '../action/leftLabelListAction';

var leftLabelListStore = Reflux.createStore({
  listenables: [leftLabelListAction],
  leftLabelList: [],
  onSaveLabel: function(labelTitle) {
    this.leftLabelList.push({
      className: 'fa fa-circle-o text-red',
      text: labelTitle
    });
    this.trigger(this.leftLabelList);
  },
  onFetchList: function() {
    fetch('/api/getStageList')
    .then(response=>response.json())
    .then((data)=>{
      this.leftLabelList = data;
      this.trigger(this.leftLabelList);
    });
  }
});

module.exports = leftLabelListStore;