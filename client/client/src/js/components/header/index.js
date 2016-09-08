require("!style!css!less!./index.less");

let React = require('react');
let ReactDOM = require('react-dom');
let Reflux = require('reflux');
let classNames = require('classnames');

let Header = React.createClass({
  getInitialState() {
    return {
      isMenuShow: false
    };
  },
  toggleUserMenu() {
    this.setState({isMenuShow: !this.state.isMenuShow})
  },
  render() {
    return (
      <header className="main-header">
        <nav className="navbar navbar-static-top">
          <a href="javascript:;" className="sidebar-toggle" onClick={()=>{this.props.onHeaderClick()}}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>
          <span className="navbar-title">{this.props.navbarTitle}</span>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu" onClick={()=>{this.toggleUserMenu()}}>
                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown">
                  <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                  <span className="hidden-xs">隔壁老王</span>
                </a>
                <ul className={classNames('dropdown-menu', {'active': this.state.isMenuShow})}>
                  <li className="user-header">
                    <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                    <p>
                      隔壁老王 - FE
                      <small>2016.7.26</small>
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">个人信息</a>
                    </div>
                    <div className="pull-right">
                      <a href="#" className="btn btn-default btn-flat">退出</a>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = Header;