import React from 'react';
import './material.css';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Typography } from '@material-ui/core';
import { showModal } from '../../actions/ModalActions';

class Material extends React.Component {
    render() {
        const { materials, showModal } = this.props;
        const chartStype = { fill: '#ffffff', fontSize: 12 };

        if(Object.keys(materials).length === 0) {
            return (
                <Typography variant="overline" component="p">Loading</Typography>
            )
        }

        return (
            <div className="container">
                <ResponsiveContainer width={'100%'}>
                    <BarChart layout="vertical" data={materials} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="count" type="number" tick={chartStype} />
                        <YAxis dataKey="material" type="category" tick={chartStype} width={100} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Bar dataKey="count">
                            {materials.map((entry, index) => <Cell key={index} fill="#3693bc" onClick={() => showModal({type: 'material', value: entry.material})} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      materials: state.filters.toJS().materials
    }
}
const mapDispatchToProps = {
    showModal: showModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(Material);