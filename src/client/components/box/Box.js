import React from 'react';
import './box.css';
import { Paper, Typography } from '@material-ui/core';

function Box({ title, children }) {
    return(
        <Paper>
            <div className="box-title">
                <Typography component="h1">{title}</Typography>
            </div>
            <div className="box-content">
                {children}
            </div>
        </Paper>
    )
}

export default Box;