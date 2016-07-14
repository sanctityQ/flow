/**
 * @file api.js
 * @desc api控制器
 * @author xiaoguang01
 * @date 2015/11/2
 */
var request = require('request');

module.exports = {
    //成员列表
    getMemberList: function *() {
      var result = [{
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国' + Date.now()
      }];
      
      yield this.api(result);
    },
    //任务列表
    getTaskList: function *() {
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
      yield this.api(result);
    },
    //场景列表
    getStageList: function *() {
      var result = [{
        className: 'fa fa-circle-o text-red',
        text: ' 个人'
      }, {
        className: 'fa fa-circle-o text-yellow',
        text: ' 家庭'
      }, {
        className: 'fa fa-circle-o text-light-blue',
        text: ' 工作'
      }];
      yield this.api(result);
    },
    //分类列表
    getCategoryList: function *() {
      var result = [{
        className: 'fa fa-inbox',
        text: ' 收件箱 ',
        isActive: true,
        numClassName: 'label label-primary pull-right',
        num: 12,
        type: 1
      }, {
        className: 'fa fa-hand-o-right',
        text: ' 我分配的 ',
        type: 2
      }, {
        className: 'fa fa-clock-o',
        text: ' 已延期 ',
        type: 3
      }, {
        className: 'fa fa-check',
        text: ' 处理完毕 ',
        num: 65,
        numClassName: 'label label-warning pull-right',
        type: 4
      }, {
        className: 'fa fa-trash-o',
        text: ' 回收站',
        type: 5
      }];
      yield this.api(result);
    }
};