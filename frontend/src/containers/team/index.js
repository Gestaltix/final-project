import React, { Component } from 'react';
import './index.css'
import connect from "react-redux/es/connect/connect";
import TopBar from "../../components/topbar";

class Team extends Component {
    render () {
        return (
            <div>
                <TopBar history={this.props.history}/>
                <h1>Hello</h1>
                <h1>{this.props.team.name}</h1>
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