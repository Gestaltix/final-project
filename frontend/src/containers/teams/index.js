import React, { Component } from 'react';
import './index.css'
import { Button } from '@material-ui/core';
import connection from '../../connection';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Teams extends Component {
    addTeamButton = () => {
        this.props.history.push('/new-team')
    }
    selectTeam = (teamId) => () => {
        this.props.history.push(`/team/${teamId}`)
    }
    deleteTeamButton = () => {
        if (prompt('Are you sure you want to continue? This is irreversible. \nType "yes" to continue').toLowerCase() === 'yes') {
            this.props.dispatch({
                method: 'DELETE',
                endpoint: `teams/${this.props.teams[this.props.nonFetchData.teamTab].id}`,
                type: null
            }).then(() => this.componentDidMount())
        }
    }

    teamList = () => {
        if (this.props.teams.length > 0) {
            return this.props.teams.map((team) => {
                return (
                    <ListItem className='TeamsListItem' button key={team.id} onClick={this.selectTeam(team.id)}>
                        <ListItemText primary={team.name} secondary={`${team.members.length} Players`} />
                    </ListItem>
                )
            })
        }
    }
    render() {
        return (
            <div>
                {this.props.teams.length !== 0 ?
                    <div className='TeamsList'>
                        <List component="nav">
                            {this.teamList()}
                        </List>
                        <div className='AddTeamDiv'><Button variant='outlined' onClick={this.addTeamButton}>Add Team</Button></div>
                    </div>
                    :
                    <div>
                        <h3>We don't have any teams associated with your account. Click the "Add Team" button to add one!</h3>
                        <div className='AddTeamDiv'><Button variant='outlined' onClick={this.addTeamButton}>Add Team</Button></div>
                    </div>
                }
            </div>
        );
    }
    componentDidMount = () => {
        this.props.dispatch({
            method: "GET",
            endpoint: 'teams',
            type: 'setTeams'
        })
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

export default connection(Teams);