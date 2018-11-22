import React, { Component } from 'react';
import TopBar from '../../components/topbar';
import Dropzone from 'react-dropzone';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        <h1 className='HomeHeader'>No Device Connected</h1>
        <Dropzone className='dropzone' onDrop={this.onDrop} multiple={false} >
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
      </div>
    );
  }
  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const readFile = reader.result;
        console.log(readFile)
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsArrayBuffer(file);
    });
  }
}

export default Home;
