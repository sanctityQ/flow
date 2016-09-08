require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var registerStore = require('../../store/registerStore');
var registerAction = require('../../action/registerAction');

var Register = React.createClass({
  mixins: [Reflux.connect(registerStore, 'stateKey')],
  getInitialState: function() {
    return {
      isChecked: false
    };
  },
  componentWillMount: function() {},
  componentDidMount: function() {
    registerAction.setCheckboxStyle();
  },
  handleClick: function() {},
  render: function() {
    registerAction.setCheckboxStyle();
    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html"><b>Task</b></a>
        </div>

        <div className="register-box-body">
          <p className="login-box-msg">注册</p>

          <form action="../../index.html" method="post">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="邮箱/手机号" />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="密码" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="确认密码" />
              <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <button type="submit" className="btn btn-primary btn-block btn-flat">注册</button>
              </div>
            </div>
          </form>

          <a href="#login" className="text-center">已有帐号，去登录</a>
        </div>
      </div>
    );
  }
});

module.exports = Register;