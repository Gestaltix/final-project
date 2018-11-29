import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './index.css'
import { Tabs, Tab } from '@material-ui/core';
import connection from '../../connection';

class Graph extends Component {
    render() {
        return (
            this.props.teams.length !== 0 ?
                <div>
                    <Tabs centered value={this.props.nonFetchData.teamTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
                        {this.props.teams.map((team) => {
                            return <Tab key={team.name} label={team.name} />
                        })}
                        <Tab label='New Team' />
                    </Tabs>
                    <Plot
                        className='GraphPlot'
                        data={[
                            {
                                type: 'line', x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], y: [2, 5, 3, 4, 5, 2, 3, 7, 8, 5, 8],
                                marker: {
                                    color: 'yellow',
                                    line:
                                        { color: 'black', width: 2 }
                                }
                            },
                        ]}
                        layout={{
                            title: this.props.teams[this.props.nonFetchData.teamTab].name
                        }}
                    />
                </div>
                :
                <h3>There aren't any teams associated with your account. Please add a team in the "Add Team" tab.</h3>
        );
    }
    tabHandler = (e, index) => {
        this.props.dispatch({
            type: 'changeTeamTab',
            tab: index
        })
    }
}

export default connection(Graph);