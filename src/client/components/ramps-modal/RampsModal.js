import React from 'react';
import './rampsModal.css'
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { closeModal } from '../../actions/ModalActions';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        position: 'absolute',
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class RampsModal extends React.Component {
    handleClose = () => {
        this.props.closeModal();
    };

  render() {
        const { mapData, position, zoom, showModal, closeModal } = this.props;

        return (
            <Modal open={showModal}
                   onClose={this.handleClose}>
                <div style={getModalStyle()} className="modal-content">
                <Map center={[position.lat, position.lng]} 
                    zoom={zoom} >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    { mapData && Object.keys(mapData).length > 0 ? <GeoJSON data={mapData} /> : null }
                </Map>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      mapData: state.modal.toJS().mapData,
      showModal: state.modal.toJS().showModal,
      position: state.modal.toJS().position,
      zoom: state.modal.toJS().zoom
    }
}
const mapDispatchToProps = {
    closeModal: closeModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(RampsModal);