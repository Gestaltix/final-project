import React, { Component } from 'react';
import './index.css'
import connect from "react-redux/es/connect/connect";
import TopBar from "../../components/topbar";
import { ListItem, ListItemText, Button } from '@material-ui/core';

class Team extends Component {
    handleClick = () => {

    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setPlayer',
            method: 'GET',
            endpoint: `teams/members/${this.props.match.params.id}`
        })
        this.props.dispatch({
            type: `sessions/get-player-data/${this.props.match.params.id}`,
            method: 'GET',
        })
    }
    render() {
        return (
            <div>
                <TopBar history={this.props.history} />
                <h1>{this.props.player.name}</h1>
                <Button>Make Graph</Button>
            </div>
        );
    }
}

const mstp = (state, props) => {
    return {
        player: state.player,
    }
}

export default connect(mstp)(Team);