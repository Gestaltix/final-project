import React, { Component } from 'react'
import connection from '../../connection';

class Session extends Component {
    render() {
        return this.props.sessions.selectedSession ?
            <h1>{this.props.selectedSession.team.name}</h1> : null
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setSession',
            method: 'GET',
            endpoint: `sessions/{this.props.match.params.id}`
        })
    }
}

export default connection(Session);