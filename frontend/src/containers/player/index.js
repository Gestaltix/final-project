import React, { Component } from 'react';
import './index.css'
import connect from "react-redux/es/connect/connect";
import TopBar from "../../components/topbar";
import Plot from 'react-plotly.js';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
            type: 'setPlayerGraph',
            method: 'GET',
            endpoint: `sessions/get-player-data/${this.props.match.params.id}`
        })
    }
    handleDelete = () => {
        this.props.dispatch({
            method: 'DELETE',
            endpoint: `teams/members/${this.props.match.params.id}`,
            type: null
        }).then(this.props.history.replace('/'))
    }
    render() {
        return (
            <div>
                <TopBar history={this.props.history} />
                <h1>{this.props.player.name}</h1>
                <h2>{this.props.player.height} m</h2>
                <h2>{this.props.player.weight} kg</h2>
                <h2>birthday: {this.props.player.birthday}</h2>
                {this.props.x.length !== 0 ?
                    <Plot
                        data={[
                            {
                                x: this.props.x,
                                y: this.props.aReserve,
                                type: 'bar',
                                mode: 'lines+points',
                                name: 'Anareobic Reserve',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{ width: '100%', height: '400', title: 'Anareobic Reserve' }}
                    /> : null}
                {this.props.x.length !== 0 ?
                    <Plot
                        data={[
                            {
                                x: this.props.x,
                                y: this.props.pLoad,
                                type: 'bar',
                                mode: 'lines+points',
                                name: 'Player Load',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{ width: '100%', height: '400', title: 'Player Load' }}
                    /> : null}
                {this.props.x.length !== 0 ?
                    <Plot
                        data={[

                            {
                                x: this.props.x,
                                y: this.props.cPower,
                                type: 'bar',
                                mode: 'lines+points',
                                name: 'Critical Power',
                                marker: { color: 'purple' },
                            },
                        ]}
                        layout={{ width: '100%', height: '400', title: 'Critical Power' }}
                    /> : null}
                <Link to={`/update-player/${this.props.match.params.id}`}><Button>Update Player</Button></Link>
                <Button onClick={this.handleDelete}>Delete Player</Button>
            </div>
        );
    }
}

const mstp = (state, props) => {
    return {
        player: state.player,
        playerGraph: state.graphs.playerGraph,
        x: state.graphs.playerGraph ? state.graphs.playerGraph.map(d => d.time) : [],
        pLoad: state.graphs.playerGraph ? state.graphs.playerGraph.map(d => d.total_player_load) : [],
        cPower: state.graphs.playerGraph ? state.graphs.playerGraph.map(d => d.critical_power) : [],
        aReserve: state.graphs.playerGraph ? state.graphs.playerGraph.map(d => d.anareobic_reserve) : [],
    }
}

export default connect(mstp)(Team);