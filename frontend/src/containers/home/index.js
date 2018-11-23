import React, { Component } from 'react';
import TopBar from '../../components/topbar';
import Dropzone from 'react-dropzone';
import './index.css';
import connection from '../../connection';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <FilePond server='http://0.0.0.0:8000/backend/data-send/' />
      </div >
    );
  }
  onDrop = (files) => {
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])
    console.log(data.file)
    this.props.dispatch({
      type: 'sendData',
      method: 'POST',
      endpoint: 'data-send',
      body: data
    })
  }
}



export default connection(Home);
