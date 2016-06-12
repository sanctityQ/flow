var Reflux = require('reflux');
var leftFolderListAction = require('../action/leftFolderListAction');
window.$ = window.jQuery = require('../../vendor/bower_components/jquery/dist/jquery.js');
var iCheck = require('../../vendor/plugins/iCheck/icheck.js');

var leftFolderListStore = Reflux.createStore({
  listenables: [leftFolderListAction],
  leftFolderList: [],
  onSetCheckboxStyle: function() {
    $(function() {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
    });
  },
  onFetchList: function() {
    var data = [{
      className: 'fa fa-inbox',
      text: ' 收件箱 ',
      isActive: true,
      numClassName: 'label label-primary pull-right',
      num: 12
    }, {
      className: 'fa fa-envelope-o',
      text: ' 我分配的 '
    }, {
      className: 'fa fa-file-text-o',
      text: ' 已延期 '
    }, {
      className: 'fa fa-filter',
      text: ' 处理完毕 ',
      num: 65,
      numClassName: 'label label-warning pull-right'
    }, {
      className: 'fa fa-trash-o',
      text: ' 删除的'
    }];
    this.leftFolderList = data;
    this.trigger({
      leftFolderList: this.leftFolderList
    });
  }
});

module.exports = leftFolderListStore;