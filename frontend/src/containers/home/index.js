import React, { Component } from 'react';
import connection from '../../connection';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Tabs, Tab } from '@material-ui/core';
import TopBar from '../../components/topbar';
// eslint-disable-next-line
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Teams from '../../containers/teams';
import ChangeMemberForm from '../change-member-form';
import Sessions from '../sessions';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: ['Teams', 'Add Team', 'Sessions']
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <TopBar history={this.props.history} />
        <Tabs centered value={this.props.nonFetchData.homeTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
          {this.state.tabs.map(tab => { return <Tab key={tab} label={tab} /> })}
        </Tabs>
        {this.props.nonFetchData.homeTab === 0 ? <Teams /> : null}
        {this.props.nonFetchData.homeTab === 1 ? <FilePond className='FilePond' server='165.227.139.129' /> : null}
        {this.props.nonFetchData.homeTab === 2 ? <Sessions /> : null}
      </div >
    );
  }
  tabHandler = (e, index) => {
    this.props.dispatch({
      type: 'changeHomeTab',
      tab: index
    })
  }
  componentDidMount = () => {
    if (!localStorage.getItem('token')) { this.props.history.replace('/login') }
    else {
      this.props.dispatch({
        type: 'setTeam',
        method: 'GET',
        endpoint: 'get-teams',
      })
    }
  }
}



export default connection(Home);
