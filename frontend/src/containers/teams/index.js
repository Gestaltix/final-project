import React, { Component } from 'react';
import './index.css'
import { Button, Paper } from '@material-ui/core';
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
                    <ListItem divider={true} className='TeamsListItem' button key={team.id} onClick={this.selectTeam(team.id)}>
                        <ListItemText primary={team.name} secondary={`${team.members.length} Players`} />
                    </ListItem>
                )
            })
        }
    }
    render() {
        return (
            <div className='Teams'>
                <div className='AddTeamButtonDiv'>
                    <Button color='primary' variant='contained' onClick={this.addTeamButton}>
                        Add Team
                </Button>
                </div>
                <Paper className='TeamsPaper'>
                    {this.props.teams.length !== 0 ?
                        <div className='TeamsList'>
                            <List component="nav">
                                {this.teamList()}
                            </List>
                        </div>
                        :
                        <div>
                            <h3>We don't have any teams associated with your account. Click the "Add Team" button to add one!</h3>
                        </div>
                    }
                </Paper>
            </div >
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