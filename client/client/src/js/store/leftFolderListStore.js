import 'whatwg-fetch';
import Reflux from 'reflux';
import leftFolderListAction from '../action/leftFolderListAction';

var leftFolderListStore = Reflux.createStore({
  listenables: [leftFolderListAction],
  leftFolderList: [],
  onFetchList() {
    fetch('/api/getCategoryList')
    .then(response=>response.json())
    .then((data)=>{
      this.leftFolderList = data;
      this.trigger({
        leftFolderList: this.leftFolderList
      });
    });
  }
});

module.exports = leftFolderListStore;