import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';
import TopBar from '../../components/topbar';
import './index.css'

class MapSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            members: [],
            memberId: null,
            pairs: {},
        }
    }
    render() {
        console.log(this.state.files)
        return <div>
            <TopBar history={this.props.history} />
            <h2>Map players to files...</h2>
            <div className='MapSession'>
                {this.props.members.map(member => {
                    return <div className='MapSessionRow'>
                        <p>{member.name}</p>
                        <select onChange={e => this.handleChange(e, member.id)}>
                            <option disabled selected>Files</option>
                            {this.props.files.map(file => {
                                return <option value={file.id}>{file.filename}</option>
                            })}
                        </select>
                    </div>
                })}
            </div>
            <div className='SessionButton'><Button color='primary' variant='contained' onClick={this.handleCLick}>Load Data</Button></div>
        </div>
    }
    handleChange = (e, member) => {
        this.props.dispatch({
            type: 'changeFile',
            endpoint: `files/update/${e.currentTarget.value}`,
            body: {
                member: member
            },
            method: 'PUT'
        })
    }
    handleCLick = () => {
        this.props.dispatch({
            type: null,
            endpoint: `sessions/load-data/${this.props.match.params.id}`,
            method: 'POST'
        })
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setSession',
            method: 'GET',
            endpoint: `sessions/${this.props.match.params.id}`
        })
        this.props.dispatch({
            type: 'setTeams',
            method: 'GET',
            endpoint: 'teams',
        })
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.sessions.selectedSession ? state.sessions.selectedSession.files : [],
        members: state.sessions.selectedSession
            && state.teams.length !== 0 ? state.teams.find(team => team.id === state.sessions.selectedSession.team).members : [],
    }
}

export default connect(mapStateToProps)(MapSession);