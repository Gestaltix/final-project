import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './index.css'
import { Tabs, Tab, Button, Paper, TextField } from '@material-ui/core';
import connection from '../../connection';
import ChangeMemberForm from '../change-member-form';

class Graph extends Component {
    render() {
        return (
            this.props.teams.length !== 0 ?
                this.props.teams[this.props.nonFetchData.teamTab].members.length !== 0 ?
                    <div>
                        <div className='GraphButton'><Button>New Team</Button></div>
                        <Tabs centered value={this.props.nonFetchData.teamTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
                            {this.props.teams.map((team) => {
                                return <Tab key={team.name} label={team.name} />
                            })}
                        </Tabs>
                        Name: <TextField label={this.props.teams[this.props.nonFetchData.teamTab].name} />

                        <Button>Add Player</Button>
                        <ChangeMemberForm />
                    </div>
                    :
                    <h3>There aren't any members associated with your team. Click above to add one!</h3>
                :
                <h3>Loading...</h3>
        );
    }
    tabHandler = (e, index) => {
        this.props.dispatch({
            type: 'changeMemberTab',
            tab: 0
        })
        this.props.dispatch({
            type: 'changeTeamTab',
            tab: index
        })
    }
}

export default connection(Graph);