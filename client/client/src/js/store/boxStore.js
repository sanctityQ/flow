import 'whatwg-fetch';
import Reflux from 'reflux';
import boxAction from '../action/boxAction';

var boxStore = Reflux.createStore({
  listenables: [boxAction],
  boxList: [],
  onFetchList(listType) {
    fetch('/api/getTaskList?listType=' + listType)
    .then(response=>response.json())
    .then((data)=>{
      this.boxList = data;
      this.trigger({
        boxList: this.boxList
      });
    });
  }
});

module.exports = boxStore;