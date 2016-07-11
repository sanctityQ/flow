var Reflux = require('reflux');
var boxAction = require('../action/boxAction');
window.$ = require('zepto-commonjs');

var boxStore = Reflux.createStore({
  listenables: [boxAction],
  boxList: [],
  onFetchList: function(listType) {
    var result = [{
      type: '今天',
      data: [{
        name: '石建国',
        title: ' h5邀请好友' + listType,
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
      }]
    }, {
      type: '昨天',
      data: [{
        name: '石建国',
        title: ' h5邀请好友' + listType,
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
      }]
    }, {
      type: '前天',
      data: [{
        name: '石建国',
        title: ' h5邀请好友' + listType,
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
      }]
    }];

    this.boxList = result;
    this.trigger({
      boxList: this.boxList
    });
  }
});

module.exports = boxStore;