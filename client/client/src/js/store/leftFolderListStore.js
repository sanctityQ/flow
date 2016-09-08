import 'whatwg-fetch';
import Reflux from 'reflux';
import leftFolderListAction from '../action/leftFolderListAction';

var leftFolderListStore = Reflux.createStore({
  listenables: [leftFolderListAction],
  onFetchList() {
    fetch('/api/getCategoryList')
    .then(response=>response.json())
    .then((data)=>{
      this.trigger(data);
    });
  }
});

module.exports = leftFolderListStore;