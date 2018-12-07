import React, { Component } from 'react';
import { Button, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@material-ui/core'
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
        console.log(this.props)
        return <div className='Session'>
            <TopBar history={this.props.history} />
            {
                this.props.teamGraph ?
                    <Paper className='GraphPaper'>
                        <h2 className='NameForm'>Total Energy Per Zone</h2>
                        <Table classes={{ root: { backgroundColor: 'yellow' } }} className='Table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                        </TableCell>
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
                                        Least Power
                        </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.teamGraph ?
                                    Object.keys(this.props.teamGraph).map(key => {
                                        return <TableRow>
                                            {this.props.members.find(m => m.id === parseInt(key)) ?
                                                <TableCell>{this.props.members.find(m => m.id === parseInt(key)).name}</TableCell> : null}
                                            {this.props.teamGraph[key].map(dataPoint => {
                                                return <TableCell>{dataPoint.total_energy_kj_per_kg}</TableCell>
                                            })}
                                        </TableRow>
                                    }) : null}
                            </TableBody>
                        </Table>
                        <h2 className='NameForm'>Total Time Per Zone</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                        </TableCell>
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
                                        Least Power
                        </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.teamGraph ?
                                    Object.keys(this.props.teamGraph).map(key => {
                                        return <TableRow>
                                            {this.props.members.find(m => m.id === parseInt(key)) ?
                                                <TableCell>{this.props.members.find(m => m.id === parseInt(key)).name}</TableCell> : null}
                                            {this.props.teamGraph[key].map(dataPoint => {
                                                return <TableCell>{dataPoint.total_time_sec}</TableCell>
                                            })}
                                        </TableRow>
                                    }) : null}
                            </TableBody>
                        </Table>
                    </Paper>
                    : null
            }
            <Paper className='SessionPaper'>
                <h2>MAP PLAYERS TO FILES</h2>
                <div className='MapSession'>
                    {this.props.members.map(member => {
                        return <div className='MapSessionRow'>
                            <p>{member.name}</p>
                            <select onChange={e => this.handleChange(e, member.id)}>
                                {this.props.files.find(file => file.id === member.id) ?
                                    <option disabled selected>{this.props.files.find(file => file.id === member.id).filename}</option> :
                                    <option disabled selected>Files</option>}
                                {this.props.files.map(file => {
                                    return <option value={file.id}>{file.filename}</option>
                                })}
                            </select>
                        </div>
                    })}
                </div>
                <div className='SessionButtons'><Button fullWidth color='primary' variant='contained' onClick={this.handleCLick} disabled=
                    {this.props.sessions.selectedSession
                        && !this.props.sessions.selectedSession.data_load_in_progress
                        && !this.props.sessions.selectedSession.data_calculation_in_progress
                        && !this.props.sessions.selectedSession.power_categories_calculation_in_progress ?
                        false : true}>{this.props.sessions.selectedSession
                            && !this.props.sessions.selectedSession.data_load_in_progress
                            && !this.props.sessions.selectedSession.data_calculation_in_progress
                            && !this.props.sessions.selectedSession.power_categories_calculation_in_progress ? 'Load Data' : 'Loading'}</Button></div>
            </Paper>
        </div >
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
    }
    makeGraph = () => {
        console.log('making Graph...')
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
        this.props.dispatch({
            type: 'setTeamGraph',
            endpoint: `sessions/get-power-categories-from-session/${this.props.match.params.id}`,
            method: 'GET',
        })
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.sessions.selectedSession ? state.sessions.selectedSession.files : [],
        members: state.sessions.selectedSession
            && state.teams.length !== 0 ? state.teams.find(team => team.id === state.sessions.selectedSession.team).members : [],
        sessions: state.sessions,
        teamGraph: state.graphs.teamGraph
    }
}

export default connect(mapStateToProps)(MapSession);