import React, { Component } from 'react';
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core'
import { connect } from 'react-redux';
import TopBar from '../../components/topbar';
import Plot from 'react-plotly.js';
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
        console.log(this.props.sessions)
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
            {this.props.sessions.selectedSession ?
                !this.props.sessions.selectedSession.data_load_in_progress
                    && !this.props.sessions.selectedSession.data_calculation_in_progress
                    && !this.props.sessions.selectedSession.power_categories_calculation_in_progress ?
                    <div className='SessionButtons'>
                        <Button color='primary' variant='contained' onClick={this.handleCLick}>Load Data</Button>
                        <Button color='primary' variant='contained' onClick={this.handleCalculate}>Calculate Data</Button>
                        <Button color='primary' variant='contained' onClick={this.handlePowerCategories}>Calculate Power Categories</Button>
                    </div> : null : null}
            <Button onClick={this.makeGraph}>Make Graph</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Maximum Power
                        </TableCell>
                        <TableCell>
                            Enormous Power
                        </TableCell>
                        <TableCell>
                            Medium Power
                        </TableCell>
                        <TableCell>
                            Medium Power
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </div>
    }
    handleChange = (e, member) => {
        this.props.dispatch({
            type: null,
            endpoint: `files/update/${e.currentTarget.value}`,
            body: {
                member: member
            },
            method: 'PUT'
        })
            .then(() => this.componentDidMount())
    }
    makeGraph = () => {
        console.log('making Graph...')
        this.props.dispatch({
            type: 'setTeamGraph',
            endpoint: `sessions/get-power-categories-from-session/${this.props.match.params.id}`,
            method: 'GET',
        })
    }
    handlePowerCategories = () => {
        this.props.dispatch({
            type: null,
            endpoint: `sessions/calculate-power-categories/${this.props.match.params.id}`,
            method: 'POST'
        })
            .then(() => this.componentDidMount())
    }
    handleCalculate = () => {
        this.props.dispatch({
            type: null,
            endpoint: `sessions/calculate-data/${this.props.match.params.id}`,
            method: 'POST'
        })
            .then(() => this.componentDidMount())
    }
    handleCLick = () => {
        this.props.dispatch({
            type: null,
            endpoint: `sessions/load-data/${this.props.match.params.id}`,
            method: 'POST'
        })
            .then(() => this.componentDidMount())
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
        sessions: state.sessions
    }
}

export default connect(mapStateToProps)(MapSession);