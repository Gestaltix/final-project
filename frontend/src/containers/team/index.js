import React, { Component } from 'react';
import './index.css'
import connect from "react-redux/es/connect/connect";
import TopBar from "../../components/topbar";
import { ListItem, ListItemText } from '@material-ui/core';

class Team extends Component {
    selectMember = (memberId) => () => {
        this.props.history.push(`/player/${memberId}`)
    }
    render() {
        return (
            <div>
                <TopBar history={this.props.history} />
                <h1>Hello</h1>
                <h1>{this.props.team.name}</h1>
                {this.props.team.members ?
                    this.props.team.members.map(member => {
                        return <ListItem button key={member.id}>
                            <ListItemText primary={member.name} onClick={this.selectMember(member.id)} />
                        </ListItem>
                    }) : null}
            </div>
        );
    }
}

const mstp = (state, props) => {
    return {
        team: state.teams.length > 0 ? state.teams.find(t => t.id === parseInt(props.match.params.id)) : {}
    }
}

export default connect(mstp)(Team);