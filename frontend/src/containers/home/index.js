import React, { Component } from 'react';
import TopBar from '../../components/topbar';
import Dropzone from 'react-dropzone';
import './index.css';
import connection from '../../connection';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Plot from 'react-plotly.js';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <FilePond server='http://0.0.0.0:8000/backend/data-send/' />
      </div >
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <TopBar />
  //       <Plot
  //         data={[
  //           {
  //             // x: [1, 2, 3],
  //             // y: [2, 6, 3],
  //             // type: 'scatter',
  //             // mode: 'lines+points',
  //             // marker: { color: 'red' },
  //           },
  //           { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], y: [2, 5, 3, 4, 5, 2, 3, 7, 8, 5, 8] },
  //         ]}
  //         layout={{ title: 'A Fancy Plot' }}
  //         style={{
  //           height: '100%',
  //           // width: 'auto',
  //           margin: '0 auto',
  //         }}
  //       />
  //     </div>
  //   );
  // }
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
