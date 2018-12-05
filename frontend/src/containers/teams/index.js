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
                    <ListItem button key={team.id}>
                        <ListItemText primary={team.name} secondary={`${team.members.length} Players`} onClick={this.selectTeam(team.id)} />
                    </ListItem>
                )
            })
        }
    }
    render() {
        return (
            <div>
                {this.props.teams.length !== 0 ?
                    <div>
                        <List component="nav">
                            {this.teamList()}
                        </List>

                        {/*<Paper className='TeamPaper'>*/}
                        {/*<Tabs centered value={this.props.nonFetchData.teamTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>*/}
                        {/*{this.props.teams.map((team) => {*/}
                        {/*return <Tab key={team.id} label={team.name} />*/}
                        {/*})}*/}
                        {/*</Tabs>*/}
                        {/*<div className='NameForm'><p>Name:</p> <TextField placeholder={this.props.teams[this.props.nonFetchData.teamTab].name} /></div>*/}
                        {/*<Button onClick={this.deleteTeamButton}>Delete Current Team</Button>*/}
                        {/*</Paper>*/}
                        {/*<h2 className='NameForm'>Players</h2>*/}
                        {/*<div className='NameForm'><Link to='/new-player'><Button variant='outlined'>Add Player</Button></Link></div>*/}
                        {/*<div className='PlayerButtonDiv'>*/}
                        {/*{this.props.teams[this.props.nonFetchData.teamTab].members.length !== 0 ?*/}
                        {/*this.props.teams[this.props.nonFetchData.teamTab].members.map((member) => {*/}
                        {/*return <Link to={`players/${member.id}`}><Button>{member.name}</Button></Link>*/}
                        {/*}) : <p className='NameForm'>We don't have any players in this team, so you won't be able to create a session for this team yet. Click "Add Player" to add one!</p>*/}
                        {/*}*/}
                        {/*</div>*/}
                        <Button variant='outlined' onClick={this.addTeamButton}>Add Team</Button>
                    </div>
                    :
                    <h3>We don't have any teams associated with your account. Click the "Add Team" button to add one!</h3>}
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