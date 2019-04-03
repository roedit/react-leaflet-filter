import React from 'react';
import { connect } from 'react-redux';
import './rampsMap.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { coordinatesUpdated } from '../../actions/FilterActions';

class RampsMap extends React.Component {
    render() {
        const { data, position, zoom, coordinatesUpdated } = this.props;

        return (
            <Map center={[position.lat, position.lng]} 
                 zoom={zoom} 
                 onMoveEnd={(e) => coordinatesUpdated(e.target.getBounds())}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              { Object.keys(data).length > 0 ? <GeoJSON data={data} /> : null }
            </Map>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      data: state.map.toJS().data,
      position: state.map.toJS().position,
      zoom: state.map.toJS().zoom
    }
}
const mapDispatchToProps = {
    coordinatesUpdated: coordinatesUpdated
}
export default connect(mapStateToProps, mapDispatchToProps)(RampsMap);