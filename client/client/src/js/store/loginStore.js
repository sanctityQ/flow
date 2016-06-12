var Reflux = require('reflux');
var loginAction = require('../action/loginAction');
window.$ = window.jQuery = require('../../vendor/bower_components/jquery/dist/jquery.js');
var iCheck = require('../../vendor/plugins/iCheck/icheck.js');

var loginStore = Reflux.createStore({
  listenables: [loginAction],
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

module.exports = loginStore;