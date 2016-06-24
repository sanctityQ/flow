var Reflux = require('reflux');
var boxListAction = require('../action/boxListAction');

var boxListStore = Reflux.createStore({
  listenables: [boxListAction],
  boxList: [],
  onFetchList: function() {
    var data = [{
      name: '石建国',
      title: ' h5邀请好友',
      abstract: 'h5邀请好友微信分享功能',
      time: '5分钟前'
    }, {
      name: '石建国',
      title: ' h5邀请好友',
      abstract: 'h5邀请好友微信分享功能',
      time: '10分钟前'
    }, {
      name: '石建国',
      title: ' h5邀请好友',
      abstract: 'h5邀请好友微信分享功能',
      time: '15分钟前'
    }];
    this.boxList = data;
    this.trigger({
      boxList: this.boxList
    });
  }
});

module.exports = boxListStore;