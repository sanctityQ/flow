'use strict';

let request = require('request');
let os = require('os');
let path = require('path');
let parse = require('co-busboy');
let fs = require('fs');

module.exports = {
    //文件上传
    upload: function *(next) {
      // ignore non-POSTs
      if ('POST' != this.method) return yield next;

      var DEST_PATH = path.join(__dirname, '..', '..', 'upload/');

      fs.access(DEST_PATH, (err) => {
        if (err) {
          fs.mkdirSync(DEST_PATH);
        }
      });

      try {
        // multipart upload
        var parts = parse(this);
        var part;

        while (part = yield parts) {
          var stream = fs.createWriteStream(path.join(DEST_PATH, part.filename));
          part.pipe(stream);
          console.log('uploading %s -> %s', part.filename, stream.path);
        }

        yield this.api({success: true});
      } catch(e) {
        yield next;
      }
    },
    getTreeData: function *() {
      var result = {
       "name": "h5邀请好友",
       "children": [{
          id: 11,
          "name": "需求评审",
          "free": true,
          "description": "需求评审",
          "className": "snooze",
          "children": [{
            id: 111,
            "name": "需求文档",
            "description": "需求文档",
            "free": true
           }, {
            id: 112,
            "className": "snooze",
            "name": "原型图",
            "description": "原型图",
            "free": true,
          }]
         }, {
          id: 12,
          "name": "设计开发",
          "description": "设计开发",
          "free": true,
          "children": [{
            id: 121,
            "name": "前端开发",
            "description": "前端开发",
            "free": true,
            "children": [{
              id: 1211,
              "name": "客户端开发",
              "description": "客户端开发",
              "free": true,
              "children": [{
                id: 12111,
                "name": "js开发",
                "description": "js开发",
                "url": "https://developers.google.com/chart/",
                "free": true
               }, {
                id: 12112,
                "name": "样式开发",
                "description": "样式开发",
                "url": "http://www.highcharts.com/"
               },{
                id: 12113,
                "name": "html编写",
                "description": "html编写",
                "url": "http://philogb.github.io/jit/",
                "free": true
               }]
              }, {
                id: 1212,
                "name": "Node部分",
                "description": "Node部分",
                "free": true,
              }]
             }, {
              id: 122,
              "name": "后端开发",
              "description": "后端开发",
              "free": true,
              "children": [{
                id: 1221,
                "name": "java开发",
                "description": "java开发",
                "url": "http://d3js.org/",
                "free": true
              }]
            }]
        }]
      };

      yield this.api(result);
    },
    //获取评论列表
    getCommentList: function *() {
      var result = [{
        id: Math.ceil(Math.random() * 10000000),
        author: '张三丰',
        content: '我们发现经过解析后html标签被直接呈现了上去，因为React默认是有XSS保护的，所有对呈现的内容进行了转义，但在现在的场景中，我们并不需要它的转义（如果取消React默认的XSS保护，那么就需要仰仗于我们引入的库具有XSS保护或者我们手动处理）',
        time: Date.now()
      }, {
        id: Math.ceil(Math.random() * 10000000),
        author: '张无忌',
        content: '我们发现经过解析需要它的转义（如果取消React默认的XSS保护，那么就需要仰仗于我们引入的库具有XSS保护或者我们手动处理）',
        time: Date.now()
      }];
      yield this.api(result);
    },
    //成员列表
    getMemberList: function *() {
      var result = [{
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 1
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 2
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 3
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 4
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 5
      }, {
        avatar: 'https://striker.teambition.net/thumbnail/110fae3e704be9b913af77987cd02c58d0d5/w/100/h/100',
        name: '石建国',
        id: 6
      }];
      
      yield this.api(result);
    },
    //任务列表
    getTaskList: function *() {
      let listType = this.query.listType;

      var result = [{
        typeName: '8 Days ago',
        type: 'snooze',
        data: [{
          id: 1,
          name: '石建国',
          title: ' h5邀请好友' + listType,
          abstract: 'h5邀请好友微信分享功能',
          time: '5分钟前',
          level: 1,
          parent: null,
          subtask: [{
            id: 11,
            name: '石建国',
            title: ' h5邀请好友' + listType,
            abstract: 'h5邀请好友微信分享功能',
            time: '5分钟前',
            level: 2,
            parent: 1
          }, {
            id: 12,
            name: '石建国',
            title: ' h5邀请好友' + listType,
            abstract: 'h5邀请好友微信分享功能',
            time: '5分钟前',
            level: 2,
            parent: 1,
            subtask: [{
              id: 121,
              name: '石建国',
              title: ' h5邀请好友' + listType,
              abstract: 'h5邀请好友微信分享功能',
              time: '5分钟前',
              level: 3,
              parent: '1-12',
              subtask: [{
                id: 1211,
                name: '石建国',
                title: ' h5邀请好友' + listType,
                abstract: 'h5邀请好友微信分享功能',
                time: '5分钟前',
                level: 4,
                parent: '1-12-121',
                subtask: [{
                  id: 121111,
                  name: '石建国',
                  title: ' h5邀请好友' + listType,
                  abstract: 'h5邀请好友微信分享功能',
                  time: '5分钟前',
                  level: 5,
                  parent: '1-12-121-1211'
                }]
              }]
            }]
          }]
        }, {
          id: 2,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '10分钟前',
          level: 1
        }, {
          id: 3,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '15分钟前',
          level: 1
        }]
      }, {
        typeName: '5 Days ago',
        type: 'snooze',
        data: [{
          id: 101,
          name: '石建国',
          title: ' h5邀请好友' + listType,
          abstract: 'h5邀请好友微信分享功能',
          time: '5分钟前',
          level: 1
        }, {
          id: 102,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '10分钟前',
          level: 1
        }, {
          id: 103,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '15分钟前',
          level: 1
        }]
      }, {
        typeName: '昨天',
        type: '',
        data: [{
          id: 104,
          name: '石建国',
          title: ' h5邀请好友' + listType,
          abstract: 'h5邀请好友微信分享功能',
          time: '5分钟前',
          level: 1
        }, {
          id: 105,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '10分钟前',
          level: 1
        }, {
          id: 106,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '15分钟前',
          level: 1
        }]
      }, {
        typeName: '前天',
        type: '',
        data: [{
          id: 107,
          name: '石建国',
          title: ' h5邀请好友' + listType,
          abstract: 'h5邀请好友微信分享功能',
          time: '5分钟前',
          level: 1
        }, {
          id: 108,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '10分钟前',
          level: 1
        }, {
          id: 109,
          name: '石建国',
          title: ' h5邀请好友',
          abstract: 'h5邀请好友微信分享功能',
          time: '15分钟前',
          level: 1
        }]
      }];
      if (listType < 2) {
        yield this.api(result);
      } else {
        yield this.api([]);
      }
    },
    //场景列表
    getStageList: function *() {
      var result = [{
        className: 'fa fa-circle-o text-red',
        text: ' 个人',
        type: 11
      }, {
        className: 'fa fa-circle-o text-yellow',
        text: ' 家庭',
        type: 12
      }, {
        className: 'fa fa-circle-o text-light-blue',
        text: ' 工作',
        type: 13
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