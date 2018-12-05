import React, { Component } from 'react';
import './index.css'
import connect from "react-redux/es/connect/connect";
import TopBar from "../../components/topbar";
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Team extends Component {
    selectMember = (memberId) => () => {
        this.props.history.push(`/player/${memberId}`)
    }
    componentDidMount = () => {
        this.props.dispatch({
            method: "GET",
            endpoint: 'teams',
            type: 'setTeams'
        })
    }
    deleteHandler = () => {
        this.props.dispatch({
            method: "DELETE",
            type: null,
            endpoint: `teams/${this.props.match.params.id}`
        }).then(() => this.props.history.replace('/'))
    }
    render() {
        return (
            <div>
                <TopBar history={this.props.history} />
                <h1>{this.props.team.name}</h1>
                {this.props.team.members ?
                    this.props.team.members.length !== 0 ?
                        this.props.team.members.map(member => {
                            return <ListItem button key={member.id}>
                                <ListItemText primary={member.name} onClick={this.selectMember(member.id)} />
                            </ListItem>
                        }) : `This team doesn't have any members. Click the "Add Player" button to add one!` : null}
                <Link to={`/team/${this.props.match.params.id}/new-player`}><Button>Add Player</Button></Link>
                <Button onClick={this.deleteHandler}>Delete Team</Button>
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