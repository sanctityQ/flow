var Reflux = require('reflux');
var leftLabelListAction = require('../action/leftLabelListAction');

var leftLabelListStore = Reflux.createStore({
  listenables: [leftLabelListAction],
  leftLabelList: [],
  onSetCheckboxStyle: function() {
  },
  onSaveLabel: function(labelTitle) {
    this.leftLabelList.push({
      className: 'fa fa-circle-o text-red',
      text: labelTitle
    });
    this.trigger({
      leftLabelList: this.leftLabelList
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