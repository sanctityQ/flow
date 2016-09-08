import './index.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import classNames from 'classnames';

import Upload from '../upload';

export default class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesDetail: {},
      isDragActive: false,
      //上传进度
      uploadProgress: 0
    }
  }

  handleProgress(value) {
    this.setState({uploadProgress: value});
  }

  //上传成功回调
  handleUpload(res) {
    console.log(res);
  }

  //上传过程中回调
  handleChange(result) {
    if (!(result instanceof Error)) {
      this.setState({filesDetail: result})
    }
  }

  //上传中止回调
  handleStopUpload(id) {
    this.refs.upload.removeFile(id);
  }

  //文件拖拽回调
  handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    this.refs.upload.addFile(event);
  }

  handleDragEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({isDragActive: false});
    return false;
  }

  handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({isDragActive: true});
    return false;
  }

  handleDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({isDragActive: false});
    return false;
  }

  handleDrapStart(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    let filesDetail = this.state.filesDetail;
    
    return (
      <div className={classNames('task-extra', 'files', {selected: this.props.active})}>
        <div className="inner">
          <div className="main scroll-wrap">
            <div className={classNames('upload-files-drag-area', {'active': this.state.isDragActive, 'small': Object.keys(filesDetail).length})}
              onDrop={this.handleDrop}
              onDragEnd={this.handleDragEnd}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDragStart={this.handleDrapStart}
              onDragEnter={this.handleDragEnter}>
            </div>
            <div className="scroll-wrap">
              <ul className="file-attachments-list">
                {Object.keys(filesDetail).map((id, i)=>{
                  let fileDetail = filesDetail[id];
                  let thumbnailClassName = 'icon-document';
                  let size = fileDetail.size;
                  let unit = 'B';

                  if (size > 1024) {
                    size = size / 1024;
                    unit = 'KB';
                  }

                  if (size > 1024) {
                    size = size / 1024;
                    unit = 'MB';
                  }

                  if (size > 1024) {
                    size = size / 1024;
                    unit = 'GB';
                  }

                  size = Math.ceil(size);

                  if (/image\/w*/.test(fileDetail.type)) {
                    thumbnailClassName = 'icon-image';
                  }
                  return (
                    <li className="file-attachment-item" key={i}>
                      <div className={classNames('file-attachment-item-container', {'pending': fileDetail.status !== 2})}>
                        <div className="thumbnail-container">
                          <div className="mime-thumbnail">
                            <i className={classNames('iconfont', thumbnailClassName)}></i>
                          </div>
                        </div>
                        {
                          fileDetail.status == 2 ? 
                          <div className="file-attachments-list-content">{fileDetail.name}</div>
                            : 
                          <div className="file-attachments-list-content">
                            <div className="upload filename">{fileDetail.name}</div>
                            <div className="upload padder"></div>
                            <div className="upload progress-bar">
                              <div style={{width: fileDetail.progressValue}} className="upload progress-bar-complete"></div>
                            </div>
                            <div className="upload delete" onClick={()=>{this.handleStopUpload(fileDetail.id)}}><i className="fa fa-times"></i></div>
                          </div>
                        }
                        <div className="file-attachment-details">
                          <div className="file-attachment-details">
                            <span className="pretty-file-size">{size}{unit}</span>
                            <span className="sap">|</span>
                            <span className="pretty-upload-time">moments ago</span>
                          </div>
                        </div>
                        <div className="controls">
                          <a href="" title={fileDetail.name} target="_blank" className="fa fa-cloud-download"></a>
                          <div className="upload delete"><i className="fa fa-times"></i></div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="buttons theme_border_6">
            <Upload action="/api/upload" name="userfile" 
              ref="upload"
              fileSize={100000000000000000}
              onProgress={(val)=>{this.handleProgress(val)}}
              onUpload={(res)=>{this.handleUpload(res)}}
              onChange={(res)=>{this.handleChange(res)}}
            />
          </div>
        </div>
      </div>
    );
  }
}