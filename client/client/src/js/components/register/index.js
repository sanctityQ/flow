require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var registerStore = require('../../store/registerStore');
var registerAction = require('../../action/registerAction');

var Register = React.createClass({
  mixins: [Reflux.connect(registerStore)],
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
          <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>

        <div className="register-box-body">
          <p className="login-box-msg">注册新帐号</p>

          <form action="../../index.html" method="post">
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Full name" />
              <span className="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" />
              <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <input type="checkbox" /> 我同意 <a href="#">条款</a>
                  </label>
                </div>
              </div>
              <div className="col-xs-4">
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