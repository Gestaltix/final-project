import React, { Component } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import connection from '../../connection';
import TopBar from '../../components/topbar';
import './index.css';

class NewTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: ''
        }
    }
    render() {
        return <div className='NewTeam'>
            <TopBar history={this.props.history} />
            <Paper className='NewTeamPaper'>
                <h3>MAKE NEW TEAM</h3>
                <form onSubmit={this.submitHandler}>
                    <TextField fullWidth label='Team Name' value={this.state.teamName} onChange={this.teamNameHandler} />
                    <Button type='submit' >Make Team</Button>
                </form>
            </Paper>
        </div>
    }
    teamNameHandler = (e) => {
        this.setState({
            teamName: e.currentTarget.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.dispatch({
            method: 'POST',
            endpoint: 'teams',
            body: {
                name: this.state.teamName
            },
            type: null
        }).then(() => { this.props.history.goBack() })
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

export default connection(NewTeam);