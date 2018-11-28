import React, { Component } from 'react';
import connection from '../../connection';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Tabs, Tab } from '@material-ui/core';
import TopBar from '../../components/topbar';
// eslint-disable-next-line
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Graph from '../../components/graph';
import ChangePlayerForm from '../change-player-form';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: ['Team', 'Player']
    }
  }
  render() {
    console.log(this.props.nonFetchData.tab)
    return (
      <div>
        <TopBar history={this.props.history} />
        <Tabs
          value={this.props.nonFetchData.tab}
          onChange={(e, index) => this.tabHandler(e, index)}>
          {this.state.tabs.map(tab => {
            return <Tab label={tab} />
          })}
        </Tabs>
        <FilePond server='http://0.0.0.0:8000/backend/data-send/' />
        <Graph />
        {this.props.nonFetchData.tab = 1 ? <ChangePlayerForm /> : null}
      </div >
    );
  }
  tabHandler = (e, index) => {
    console.log('Dispatching changeTab')
    this.props.dispatch({
      type: 'changeTab',
      tab: index
    })
  }
  componentDidMount = () => {
    if (!localStorage.getItem('token')) { this.props.history.replace('/login') }
  }
}



export default connection(Home);
