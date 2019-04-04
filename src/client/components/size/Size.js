import React from 'react';
import './size.css';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { showModal } from '../../actions/ModalActions';

class Size extends React.Component {
    render() {
        const { ranges, showModal } = this.props;
        const chartStype = { fill: '#ffffff', fontSize: 12 };

        if(Object.keys(ranges).length === 0) {
            return (
                <Typography variant="overline" component="p">Loading</Typography>
            )
        }

        return (
            <div className="container">
                <ResponsiveContainer width={'100%'}>
                    <BarChart layout="horizontal" data={ranges} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name" type="category"  tick={chartStype} />
                        <YAxis dataKey="area" type="number"  tick={chartStype} width={10} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Bar dataKey="area">
                            {ranges.map((entry, index) => <Cell key={index} fill={'#3693bc'} onClick={() => showModal({type: 'area_', value: entry.name})}/>)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ranges: state.filters.toJS().ranges
    }
}
const mapDispatchToProps = {
    showModal: showModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(Size);