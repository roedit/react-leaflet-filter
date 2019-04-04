import React, { Component } from 'react';
import './app.css';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import RampsMap from './components/ramps-map/RampsMap';
import Box from './components/box/Box';
import Material from './components/material/Material';
import Size from './components/size/Size';
import RampsModal from './components/ramps-modal/RampsModal';
import { initData } from './actions/MapActions';

class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    fetch('/api/getData')
      .then(res => res.json())
      .then(data => {
        this.props.initData(data);
      });
  }

  render() {
    const { username } = this.state;
    
    return (
      <div className="app-root">
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <RampsModal />
        <Grid container spacing={16}>
          <Grid item lg={12} xs={12}>
            <Box title="Map">
              <RampsMap></RampsMap>
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

const mapDispatchToProps = {
  initData: initData
}
export default connect(null, mapDispatchToProps)(App);
