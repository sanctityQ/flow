import 'whatwg-fetch';
import Reflux from 'reflux';
import commentListAction from '../action/commentListAction';

let CommentListStore = Reflux.createStore({
  listenables: [commentListAction],
  commentList: [],
  onFetchList(taskId) {
    fetch('/api/getCommentList?taskId=' + taskId)
    .then(response => response.json())
    .then((data) => {
      this.commentList = data;
      this.trigger({
        commentList: this.commentList
      });
    });
  }
});

module.exports = CommentListStore;