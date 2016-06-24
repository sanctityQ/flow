var Reflux = require('reflux');
var registerAction = require('../action/registerAction');

var registerStore = Reflux.createStore({
  listenables: [registerAction],
  onSetCheckboxStyle: function() {
  }
});

module.exports = registerStore;