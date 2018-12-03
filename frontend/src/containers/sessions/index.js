import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import connection from '../../connection';
import { Link } from 'react-router-dom';
import './index.css'

class Sessions extends Component {
    render() {
        return <div className='SessionsButton'>
            <Link to='/create-session' ><Button variant='outlined' color='secondary' >Make New Session</Button></Link>
            {}
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