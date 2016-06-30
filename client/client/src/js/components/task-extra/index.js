require("!style!css!less!./index.less");

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var classNames = require('classnames');

var TaskExtra = React.createClass({
  getInitialState: function() {
    return {
      //当前选中的tab
      selectedTab: 'tab-note'
    };
  },
  render: function() {
    return (
      <div className="task-extras">
        <div className="tabs">
          <header>
            <span className="tab-header" onClick={() => {this.setState({
              selectedTab: 'tab-note'
            })}}>
              <span className="tab-label">任务描述</span>
            </span>
            <span className="tab-header" onClick={() => {this.setState({
              selectedTab: 'tab-files'
            })}}>
              <span className="tab-label">附件</span>
            </span>
            <span className="tab-header" onClick={() => {this.setState({
              selectedTab: 'tab-subTask'
            })}}>
              <span className="tab-label">子任务</span>
            </span>
          </header>
          <section>
            <div className={classNames('task-extra note', {selected: this.state.selectedTab == "tab-note"})}>
              <div className="inner">
                <div className="wallpaper"></div>
                <textarea className="task-editor" placeholder="任务描述" autofocus></textarea>
              </div>
            </div>
            <div ref="tab-files" className={classNames('task-extra files', {selected: this.state.selectedTab == "tab-files"})}>
              <div className="inner">
                <div className="main scroll-wrap">
                  <div className="upload-files-drag-area theme_bg_8 theme_color_3"></div>
                  <div className="scroll-wrap">
                    <ul className="file-attachments-list"></ul>
                  </div>
                </div>
                <div className="buttons theme_border_6">
                  <div className="file-input-wrapper theme_hover_color_1 theme_bg_8 theme_color_3 theme_border_6">
                    SELECT FROM YOUR COMPUTER
                    <input type="file" multiple="" />
                  </div>
                </div>
              </div>
            </div>
            <div ref="tab-subTask" className={classNames('task-extra subTask', {selected: this.state.selectedTab == "tab-subTask"})}>
              <div className="inner">
                <div className="wallpaper"></div>
                <textarea className="task-editor" placeholder="任务描述" autofocus></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
});

module.exports = TaskExtra;