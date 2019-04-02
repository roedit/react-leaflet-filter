import React, { Component } from 'react';
import './app.css';
import Grid from '@material-ui/core/Grid'
import Map from './components/map/Map';
import Box from './components/box/Box';
import Material from './components/material/Material';
import Size from './components/size/Size';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
    fetch('/api/getData')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    const { username } = this.state;
    
    return (
      <div className="app-root">
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <Grid container spacing={16}>
          <Grid item lg={12} xs={12}>
            <Box title="Map">
              <Map></Map>
            </Box>
          </Grid>

          <Grid item lg={6} xs={6}>
            <Box title="Ramps per construction material">
              <Material></Material>
            </Box>
          </Grid>

          <Grid item lg={6} xs={6}>
            <Box title="Ramps per size category">
              <Size></Size>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}
