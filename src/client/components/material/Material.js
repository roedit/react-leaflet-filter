import React from 'react';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Typography } from '@material-ui/core';

class Material extends React.Component {
    state = {
        isYAxisLegendVisible: true,
        yAxisWidth: 180
    };
    barGraph = React.createRef();

    componentDidMount() {
        this.calculateYAxisWidth()
    };

    calculateYAxisWidth() {
        if (this.barGraph && this.barGraph.current && this.barGraph.current.offsetWidth <= 700) {
            this.setState({
                isYAxisLegendVisible: false,
                yAxisWidth: 0
            })

            return
        }

        if(this.barGraph && this.barGraph.current && this.barGraph.current.offsetWidth) {
            let width = this.barGraph.current.offsetWidth ? this.barGraph.current.offsetWidth * 0.15 : 1;
            this.setState({
                isYAxisLegendVisible: true,
                yAxisWidth: Math.max(width, 180)
            })
        }
    };

    render() {
        const { data } = this.props;

        if(Object.keys(data).length === 0) {
            return (
                <Typography variant="overline" component="p">Loading</Typography>
            )
        }

        return (
            <ResponsiveContainer width={'95%'}>
                <BarChart layout="vertical" data={data.features} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="material" type="category" />
                    <YAxis dataKey="value" type="category" tick={this.state.isYAxisLegendVisible} width={this.state.yAxisWidth} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="square" />
                    <Bar dataKey="material">
                        {data.features.map((entry, index) => {
                            <Cell key={index} fill={'#88b488'} stroke={'#9688b4'} strokeWidth={2} />
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      data: state.filters.toJS().filteredData
    }
}
export default connect(mapStateToProps)(Material);