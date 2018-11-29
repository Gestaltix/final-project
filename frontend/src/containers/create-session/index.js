import connection from '../../connection';
import React, { Component } from 'react';
import { Paper } from '@material-ui/core/'
import './index.css';
import TopBar from '../../components/topbar';

class CreateSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            team: null
        }
    }
    render() {
        return <div>
            <TopBar />
            <Paper className='CreateSeshPaper'>Pick a team
            <select onChange={(e, index) => this.handleChange(e, index)}>
                    <option selected disabled>Pick a team</option>
                    {this.props.teams.map((team, index) => {
                        return <option value={team.name} >{team.name}</option>
                    })}
                </select>
            </Paper>

        </div>
    }
    handleChange = (e) => {
        console.log('in the handlechange')
        this.setState({ team: e.currentTarget.value })
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

export default connection(CreateSession);