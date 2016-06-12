var Reflux = require('reflux');
var leftLabelListAction = require('../action/leftLabelListAction');
window.$ = window.jQuery = require('../../vendor/bower_components/jquery/dist/jquery.js');
var iCheck = require('../../vendor/plugins/iCheck/icheck.js');

var leftLabelListStore = Reflux.createStore({
  listenables: [leftLabelListAction],
  leftLabelList: [],
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
      className: 'fa fa-circle-o text-red',
      text: ' 个人'
    }, {
      className: 'fa fa-circle-o text-yellow',
      text: ' 家庭'
    }, {
      className: 'fa fa-circle-o text-light-blue',
      text: ' 工作'
    }];
    this.leftLabelList = data;
    this.trigger({
      leftLabelList: this.leftLabelList
    });
  }
});

module.exports = leftLabelListStore;