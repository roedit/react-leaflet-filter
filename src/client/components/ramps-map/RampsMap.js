import React from 'react';
import { connect } from 'react-redux';
import './rampsMap.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { initCoordinates, coordinatesUpdated } from '../../actions/FilterActions';

class RampsMap extends React.Component {
  mapRef = React.createRef();

  componentDidMount() {
    this.props.initCoordinates(this.mapRef.current.leafletElement.getBounds())
  }

  render() {
        const { data, position, zoom, coordinatesUpdated } = this.props;

        return (
            <Map ref={this.mapRef}
                 center={[position.lat, position.lng]} 
                 zoom={zoom} 
                 onMoveEnd={(e) => coordinatesUpdated(e.target.getBounds())}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
    initCoordinates: initCoordinates,
    coordinatesUpdated: coordinatesUpdated
}
export default connect(mapStateToProps, mapDispatchToProps)(RampsMap);