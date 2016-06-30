var Reflux = require('reflux');
var loginAction = require('../action/loginAction');

var loginStore = Reflux.createStore({
  listenables: [loginAction],
  onSetCheckboxStyle: function() {
    
  }
});

module.exports = loginStore;