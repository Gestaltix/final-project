import React, { Component } from 'react';
import { Button, List, ListItem, ListItemText, ListItemIcon, Paper } from '@material-ui/core'
import connection from '../../connection';
import { Link } from 'react-router-dom';
import './index.css'
import Loading from '../../assets/images/spinningwheel.gif'

class Sessions extends Component {
    render() {
        return <div className='Sessions'>

            <Link to='/create-session' className='SessionsButton'>
                <Button
                    variant='contained'
                    color='primary' >
                    Make New Session
                    </Button>
            </Link>

            <div className='TeamsList'>
                <Paper className='SessionsPaper'>
                    <List >
                        {this.props.sessions.sessions ?
                            this.props.sessions.sessions.map((session, index) => {
                                return <Link to={`/sessions/${session.id}`}>
                                    <ListItem divider={true}>
                                        <ListItemText
                                            primary={`Session ${session.id}`}
                                            secondary={`${session.files.length} Files - ${
                                                session.data_load_in_progress ? 'Loading Data -' :
                                                    session.data_calculation_in_progress ? 'Calculating Data -' :
                                                        session.power_categories_calculation_in_progress ? 'Calculating Power Categories -' : ''
                                                } ${this.props.teams.find(team => team.id === session.team).name}`}
                                            onClick={this.clickHandler} />

                                        {session.data_load_in_progress
                                            || session.data_calculation_in_progress
                                            || session.power_categories_calculation_in_progress ?
                                            <ListItemIcon>
                                                <img
                                                    className='LoadingGif'
                                                    src={Loading}
                                                    alt='This session is loading. It might take some time' />
                                            </ListItemIcon> : null}

                                    </ListItem>
                                </Link>
                            }) : null}
                    </List>
                </Paper>
            </div>
        </div>
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setSessions',
            endpoint: 'sessions',
            method: 'GET',
        })
        this.props.dispatch({
            type: 'setTeams',
            endpoint: 'teams',
            method: 'GET'
        })
    }
}

export default connection(Sessions);