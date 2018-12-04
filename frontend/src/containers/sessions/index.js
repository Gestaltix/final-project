import React, { Component } from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import connection from '../../connection';
import { Link } from 'react-router-dom';
import './index.css'

class Sessions extends Component {
    render() {
        return <div className='SessionsButton'>
            <Link to='/create-session' ><Button variant='outlined' color='secondary' >Make New Session</Button></Link>
            <List>
                {this.props.sessions.sessions ?
                    this.props.sessions.sessions.map((session, index) => {
                        return <Link to={`/sessions/${session.id}`}><ListItem className='SessionsListItem'>
                            <ListItemText primary={session.id} secondary={session.team.name} inset onClick={this.clickHandler} />
                        </ListItem></Link>
                    }) : null}
            </List>
        </div>
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setSessions',
            endpoint: 'sessions',
            method: 'GET',
        })
    }
}

export default connection(Sessions);