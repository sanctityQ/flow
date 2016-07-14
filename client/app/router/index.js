/**
 * @file index.js
 * @desc router配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var router = require('koa-router')();
var ctrs = [];
function getC(app) {
    return new Promise(function (resovel, reject) {
        try {
            ctrs = require('../libs/ctrs.js').getCtrs();
            resovel(ctrs);
        }
        catch (e) {
            reject(e);
        }
    });
}

function set(app) {
    app.use(router.routes());
    getC(app).then(function (ctrs) {
        setMap(ctrs);
    }).catch(function (e) {
        console.log(e);
    });
}

function setMap(ctrs) {
    router.get('/', ctrs.index.show);

    // //登录
    // router.post('/login', ctrs.api.login);
    // //注册
    // router.post('/register', ctrs.api.register);
    // //返回用户信息
    // router.get('/user', ctrs.api.getUser);

    //成员列表
    router.get('/api/getMemberList', ctrs.api.getMemberList);

    //左侧场景列表
    router.get('/api/getStageList', ctrs.api.getStageList);
    // //创建场景
    // router.post('/api/createStage', ctrs.api.createStage);

    //左侧分类列表
    router.get('/api/getCategoryList', ctrs.api.getCategoryList);

    //任务列表
    router.get('/api/getTastList', ctrs.api.getTastList);
    // //创建任务
    // router.post('/api/createTask', ctrs.api.createTask);
    // //获取任务信息
    // router.get('/api/getTaskInfo', ctrs.api.getTaskInfo);
    // //更新任务信息
    // router.post('/api/updateTask', ctrs.api.updateTask);
    // //删除任务信息
    // router.get('/api/removeTask', ctrs.api.removeTask);
    // //修改任务分类(包括置顶、已完成两种状态)
    // router.get('/api/modifyTaskCategory', ctrs.api.modifyTaskCategory);
    // //延迟任务
    // router.get('/api/delayTask', ctrs.api.delayTask);
    // //修改任务场景
    // router.get('/api/modifyTaskStage', ctrs.api.modifyTaskStage);

    // //文件上传
    // router.post('/upload', ctrs.api.upload);
    // //评论
    // router.post('/comment', ctrs.api.comment);
    // //各分类的消息总数
    // router.get('/notice', ctrs.api.notice);
}
module.exports = set;
