import connection from '../../connection';
import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core/'
import './index.css';
import TopBar from '../../components/topbar';
import Dropzone from 'react-dropzone';

class CreateSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracker: null,
            team: null,
            package: [],
            sent: false
        }
    }

    render() {
        return (
            <div className='CreateSession'>
                <TopBar history={this.props.history} />


                <Paper className='CreateSeshPaper'>Pick a tracker

                        <select onChange={this.handleChangeTracker}>
                        <option selected disabled>Pick a tracker</option>
                        {this.props.trackers.map((tracker, index) => {
                            return <option key={tracker.id} value={tracker.id}>{tracker.name}</option>
                        })}
                    </select>

                    Pick a team
                        <select onChange={this.handleChangeTeam}>
                        <option selected disabled>Pick a team</option>
                        {this.props.teams.map((team, index) => {
                            return <option key={team.id} value={team.id}>{team.name}</option>
                        })}
                    </select>
                </Paper>

                {this.state.team && this.state.tracker ?
                    <div className='DropZoneDiv'>
                        <h2 className='DropZoneH2'>Drop your files or click</h2>
                        <Dropzone className='DropZone' onDrop={this.handleOnDrop}></Dropzone></div> : null}
                {this.state.package.length > 0 ?
                    <div className='CreateSessionButtonDiv'>
                        <Button
                            disabled={this.state.sent}
                            size='large'
                            color='primary'
                            variant='contained'
                            onClick={this.clickHandler}>
                            {this.state.sent ? 'Loading' : 'Upload Files'}
                        </Button>
                    </div> : null}
            </div>
        )
    }

    clickHandler = () => {
        const formdata = new FormData()
        formdata.append('file', this.state.package[0])
        formdata.append('team', this.state.team)
        formdata.append('tracker', this.state.tracker)
        const options = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: formdata,
            method: 'POST'
        }
        delete options.headers['Content-Type'];
        this.setState({
            sent: true
        })
        fetch('https://skunk.propulsion-learn.ch/backend/api/sessions/create/', options)
            .then(r => r.json())
            .then((r) => {
                console.log(r)
                this.props.dispatch({
                    type: 'setSession',
                    data: r
                })
                return r
            })
            .then(r => {
                this.props.dispatch({
                    method: 'GET',
                    endpoint: `teams/${r.team}`,
                    type: 'setSessionTeam'
                })
                this.props.history.replace(`/sessions/${r.id}`)
            })
    }
    handleOnDrop = (e) => {
        this.setState({
            package: e
        })
    }
    handleChangeTeam = (e) => {
        this.setState({ team: parseInt(e.currentTarget.value) })
    }
    handleChangeTracker = (e) => {
        this.setState({ tracker: parseInt(e.currentTarget.value) })
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
        this.props.dispatch({
            type: 'setTeams',
            method: 'GET',
            endpoint: 'teams',
        })
        this.props.dispatch({
            type: 'setTrackers',
            method: 'GET',
            endpoint: 'trackers',
        })
    }
}

export default connection(CreateSession);