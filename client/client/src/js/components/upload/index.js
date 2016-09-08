'use strict';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import upload from '../util/upload';

class Upload extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: {},
      filesDetail: {}
    };
    this.addFile = this.addFile.bind(this);
  }

  isCompleted () {
    let completed = true,
        files = this.state.files;
    Object.keys(files).forEach((id) => {
      if (files[id].status !== 2) {
        completed = false;
      }
    });
    return completed;
  }

  getValue () {
    let values = [],
        files = this.state.files;
    const { sep } = this.props;
    Object.keys(files).forEach((id) => {
      values.push(files[id].value);
    });
    if (sep) {
      values = values.join(sep);
    }
    return values;
  }

  handleChange (val) {
    const { onChange } = this.props;

    let value = val || this.state.filesDetail;

    if (onChange) {
      onChange(value);
    }
  }

  addFile (event) {
    const { accept, fileSize } = this.props;

    let inputFileEle = event.dataTransfer || event.target;
    let fileList = inputFileEle.files;
    //清空input选择框
    inputFileEle.outerHTML = inputFileEle.outerHTML;

    let files = this.state.files;
    let filesDetail = this.state.filesDetail;

    Object.keys(fileList).forEach((key) => {
      let file = fileList[key];
      if (file.size / 1024 > fileSize) {
        this.handleChange(new Error('附件不能大于' + fileSize));
        return;
      }

      let id = Date.now().toString(36);
      files[id] = { file };

      files[id].xhr = this.uploadFile(file, id);
      filesDetail[id] = {id: id, name: file.name, size: file.size, type: file.type, status: 1, progressValue: 0};

      this.setState({ files, filesDetail });
    });
  }

  removeFile (id) {
    let files = this.state.files;
    let file = files[id];
    if (file.xhr) {
      file.xhr.abort();
    }
    delete files[id];
    this.setState({ files });
    this.handleChange();
  }

  uploadFile (file, id) {
    let { onUpload, onProgress } = this.props;
    return upload({
      url: this.props.action,
      name: this.props.name,
      cors: this.props.cors,
      withCredentials: this.props.withCredentials,
      file: file,
      onProgress: (e) => {
        let filesDetail = this.state.filesDetail;
        let fileDetail = filesDetail[id];
        let progressValue = (e.loaded / e.total) * 100 + '%';

        fileDetail.progressValue = progressValue;

        this.setState({ filesDetail });
        this.handleChange();
      },
      onLoad: (e) => {
        let files = this.state.files;
        let filesDetail = this.state.filesDetail;
        let value = e.currentTarget.responseText;
        if (onUpload) {
          value = onUpload(value);
        }

        if (value instanceof Error) {
          files[id].status = 3;
          files[id].name = value.message;
        } else {
          filesDetail[id].status = 2;
        }

        this.setState({ files, filesDetail });
        this.handleChange();
      },
      onError: () => {
        let files = this.state.files;
        files[id].status = 3;
        this.setState({ files });
        this.handleChange();
      }
    });
  }

  render () {
    return (
      <div className="file-input-wrapper theme_hover_color_1 theme_bg_8 theme_color_3 theme_border_6">
        SELECT FROM YOUR COMPUTER
        <input type="file" multiple="multiple" id="upload" onChange={(e)=>{this.addFile(e)}}/>
      </div>
    );
  }
}

Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
  content: PropTypes.object,
  cors: PropTypes.bool,
  fileSize: PropTypes.number,
  limit: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onProgress: PropTypes.func,
  onUpload: PropTypes.func,
  sep: PropTypes.string,
  style: PropTypes.object,
  withCredentials: PropTypes.bool
};

Upload.defaultProps = {
  cors: true,
  fileSize: 4096,
  limit: 1,
  withCredentials: false
};

module.exports = Upload;