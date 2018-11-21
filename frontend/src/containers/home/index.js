import React, { Component } from 'react';
import TopBar from '../../components/topbar';
import './index.css';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        <h1 className='HomeHeader'>No Device Connected</h1>
      </div>
    );
  }
}

export default Home;
