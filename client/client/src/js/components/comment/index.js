require("!style!css!less!./index.less");

import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import ClickAway from '../mixins/ClickAway';
import CommentListStore from '../../store/commentListStore';
import CommentListAction from '../../action/commentListAction';

class Comment extends ClickAway(Component) {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    };
  }

  onChange(data) {
    this.setState(data);
  }

  componentWillMount() {
    this.unsubscribe = CommentListStore.listen((data)=>{this.onChange(data)});
    CommentListAction.fetchList();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="box box-widget box-comments-wrap">
        <div className="box-header with-border">
          <h3 className="box-title">评论</h3>
        </div>
        <div className="box-footer box-comments">
          {this.state.commentList.map((comment, i) => {
            return (
              <div className="box-comment" key={i}>
                <span className="comment-avatar" title={comment.author.slice(0, 1)}></span>
                <div className="comment-text">
                  <span className="username">
                    {comment.author}
                    <span className="text-muted pull-right">{comment.time}</span>
                  </span>
                  {comment.content}
                </div>
              </div>
            );
          })}
        </div>
        <div className="box-footer">
          <form action="#" method="post">
            <span className="comment-avatar" title="石"></span>
            <div className="img-push">
              <input type="text" className="form-control input-sm" placeholder="回车提交评论" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Comment;