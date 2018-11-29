import React, { Component } from 'react';
import { Button } from '@material-ui/core'
import connection from '../../connection';

class Logout extends Component {
    render() {
        return <Button variant='outlined' color='primary' onClick={this.clickHandler}>Logout</Button>
    }
    clickHandler = () => {
        localStorage.removeItem('token')
        this.props.history.replace('/login')
    }
}

export default connection(Logout);