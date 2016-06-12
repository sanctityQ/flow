var Reflux = require('reflux');
var registerAction = require('../action/registerAction');
window.$ = window.jQuery = require('../../vendor/bower_components/jquery/dist/jquery.js');
var iCheck = require('../../vendor/plugins/iCheck/icheck.js');

var registerStore = Reflux.createStore({
  listenables: [registerAction],
  onSetCheckboxStyle: function() {
    $(function() {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
    });
  }
});

module.exports = registerStore;