/**
 * @file api.js
 * @desc api控制器
 * @author xiaoguang01
 * @date 2015/11/2
 */
var request = require('request');

module.exports = {
    getCrowdList: function *() {
        var crowdList = [
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				}
			]
        yield this.api(crowdList);
    },
    getTaskList: function () {
    	var that = this;
    	request.get('http://120.132.61.159:8080/mockjsdata/10/task/list?type=1')
    	.on('response', function(res) {
    		that.api(res);
    	})
    }
};

