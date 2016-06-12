var React = require('react');
var Header = require('../../components/header');
var ContenttHeader = require('../../components/content-header');
var Folder = require('../../components/left-folder');
var Label = require('../../components/left-label');
var BoxHeader = require('../../components/box-header');
var BoxBody = require('../../components/box-body');
var Panel = React.createClass({
  render: function(){
    return (
      <div className="wrapper skin-blue sidebar-collapse">
        <Header />
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              <div className="col-md-3">
                <a href="compose.html" className="btn btn-primary btn-block margin-bottom">添加任务</a>
                <Folder />
                <Label />
              </div>
              <div className="col-md-9">
                <div className="box box-primary">
                  <BoxHeader />
                  <BoxBody />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
});
module.exports = Panel;