import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import { Tabs, Tab, Button, TextField, Paper } from '@material-ui/core';
import connection from '../../connection';

class Teams extends Component {
    render() {
        return (
            <div>
                <Link to='/new-team' className='AddTeamButton'><Button variant='outlined'>Add Team</Button></Link>
                {this.props.teams.length !== 0 ?
                    <div>
                        <Paper className='TeamPaper'>
                            <Tabs centered value={this.props.nonFetchData.teamTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
                                {this.props.teams.map((team) => {
                                    return <Tab key={team.id} label={team.name} />
                                })}
                            </Tabs>
                            <div className='NameForm'><p>Name:</p> <TextField placeholder={this.props.teams[this.props.nonFetchData.teamTab].name} /></div>
                            <Button onClick={this.clickHandler}>Delete Current Team</Button>
                        </Paper>
                        <h2 className='NameForm'>Players</h2>
                        <div className='NameForm'><Link to='/new-player'><Button variant='outlined'>Add Player</Button></Link></div>
                        <div className='PlayerButtonDiv'>
                            {this.props.teams[this.props.nonFetchData.teamTab].members.length !== 0 ?
                                this.props.teams[this.props.nonFetchData.teamTab].members.map((member) => {
                                    return <Link to={`players/${member.id}`}><Button>{member.name}</Button></Link>
                                }) : <p className='NameForm'>We don't have any players in this team, so you won't be able to create a session for this team yet. Click "Add Player" to add one!</p>
                            }
                        </div>
                    </div>
                    :
                    <h3>We don't have any teams associated with your account. Click the "Add Team" button to add one!</h3>}
            </div>
        );
    }
    clickHandler = () => {
        if (prompt('Are you sure you want to continue? This is irreversible. \nType "yes" to continue').toLowerCase() === 'yes') {
            this.props.dispatch({
                method: 'DELETE',
                endpoint: `teams/${this.props.teams[this.props.nonFetchData.teamTab].id}`,
                type: null
            }).then(() => this.componentDidMount())
        }
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
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setTeams',
            method: 'GET',
            endpoint: 'teams',
        })
    }
}

export default connection(Teams);