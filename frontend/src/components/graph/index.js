import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './index.css'

class Graph extends Component {
    render() {
        return (
            <Plot
                className='GraphPlot'
                data={[
                    { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], y: [2, 5, 3, 4, 5, 2, 3, 7, 8, 5, 8] },
                ]}
                layout={{ title: 'A Fancy Plot' }}
            />
        );
    }
}

export default Graph;