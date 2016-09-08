require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');

var loginStore = require('../../store/loginStore');
var loginAction = require('../../action/loginAction');

var Login = React.createClass({
  mixins: [Reflux.connect(loginStore, 'stateKey')],
  getInitialState() {
    return {
      isChecked: false
    }
  },

  componentWillMount() {

  },

  componentDidMount() {

  },

  handleClick() {

  },

  handleClickCheckBox() {
    this.setState({isChecked: !this.state.isChecked});
  },

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html"><b>Task</b></a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">登录</p>

          <form action="../../index2.html" method="post">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="邮箱/手机号" />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="密码" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <div className={classNames('icheckbox_square-blue', {'checked': this.state.isChecked})}>
                      <input type="checkbox" onClick={this.handleClickCheckBox}/>
                    </div>
                    记住我
                  </label>
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">登录</button>
              </div>
            </div>
          </form>

          <a href="#register" className="text-center">注册帐号</a>

        </div>
      </div>
    );
  }
});

module.exports = Login;