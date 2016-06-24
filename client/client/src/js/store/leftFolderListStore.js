var Reflux = require('reflux');
var leftFolderListAction = require('../action/leftFolderListAction');

var leftFolderListStore = Reflux.createStore({
  listenables: [leftFolderListAction],
  leftFolderList: [],
  onSetCheckboxStyle: function() {
    
  },
  onFetchList: function() {
    var data = [{
      className: 'fa fa-inbox',
      text: ' 收件箱 ',
      isActive: true,
      numClassName: 'label label-primary pull-right',
      num: 12,
      type: 1
    }, {
      className: 'fa fa-envelope-o',
      text: ' 我分配的 ',
      type: 2
    }, {
      className: 'fa fa-file-text-o',
      text: ' 已延期 ',
      type: 3
    }, {
      className: 'fa fa-filter',
      text: ' 处理完毕 ',
      num: 65,
      numClassName: 'label label-warning pull-right',
      type: 4
    }, {
      className: 'fa fa-trash-o',
      text: ' 删除的',
      type: 5
    }];
    this.leftFolderList = data;
    this.trigger({
      leftFolderList: this.leftFolderList
    });
  }
});

module.exports = leftFolderListStore;