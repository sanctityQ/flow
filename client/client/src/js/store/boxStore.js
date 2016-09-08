import 'whatwg-fetch';
import Reflux from 'reflux';
import boxAction from '../action/boxAction';

let boxStore = Reflux.createStore({
  listenables: [boxAction],
  onFetchList(listType) {
    fetch('/api/getTaskList?listType=' + listType)
    .then(response => response.json())
    .then((data) => {
      this.trigger(data);
    });
  }
});

module.exports = boxStore;