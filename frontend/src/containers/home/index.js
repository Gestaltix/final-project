import React, { Component } from 'react';
import connection from '../../connection';
import 'filepond/dist/filepond.min.css';
import { Tabs, Tab } from '@material-ui/core';
import TopBar from '../../components/topbar';
import Teams from '../../containers/teams';
import Sessions from '../sessions';
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: ['Teams', 'Sessions']
    }
  }
  render() {
    return (
      <div>
        <TopBar history={this.props.history} />
        <Tabs centered value={this.props.nonFetchData.homeTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
          {this.state.tabs.map(tab => { return <Tab key={tab} label={tab} /> })}
        </Tabs>
        {this.props.nonFetchData.homeTab === 0 ? <Teams history={this.props.history} /> : null}
        {this.props.nonFetchData.homeTab === 1 ? <Sessions /> : null}
      </div>
    );
  }
  tabHandler = (e, index) => {
    this.props.dispatch({
      type: 'changeHomeTab',
      tab: index
    })
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: 'Auth',
      method: 'POST',
      endpoint: 'auth/token/verify',
      body: { token: localStorage.getItem('token') }
    }).then(() => {
      console.log(this.props.auth.isAuthenticated)
      if (this.props.auth.isAuthenticated === false) {
        localStorage.removeItem('token')
        this.props.history.replace('/login')
      }
    })
  }
}



export default connection(Home);
