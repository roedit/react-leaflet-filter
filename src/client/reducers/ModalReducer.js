import { fromJS } from 'immutable';
import Big from 'big.js';

//TODO: update the zoom and position from the main map
const initialState = fromJS({
    data: {},
    mapData: {},
    northEast: {},
    southWest: {},
    position: {
        lat: -27.8975,
        lng: 153.2932,
    },
    zoom: 10,
    showModal: false
})

function filterMaterialsRamps(data, northEast, southWest, type, value) {
    const neLat = Big(northEast.lat);
    const neLng = Big(northEast.lng);
    const swLat = Big(southWest.lat);
    const swLng = Big(southWest.lng);
    let geojson = Object.assign({}, data)

    geojson.features = data.features.filter(feature => {
        const coordinates = feature.geometry.coordinates[0]
        let inViewport = false;
        
        // Convert this to a for and break if one found
        // Check if ramp is in the viewport
        coordinates[0].forEach(coordinate => {
            const lng = Big(coordinate[0]);
            const lat = Big(coordinate[1]);
            
            if((neLat.gt(lat) && swLat.lt(lat)) && (neLng.gt(lng) && swLng.lt(lng))) {
                inViewport = true;
            }
        })

        if(inViewport) {
            const rampMaterial = feature.properties.material;
            const materialKey = rampMaterial.replace(/\s/g, '');
            const rampRange = Big(feature.properties.area_);

            // Check for area range
            if(type === 'area_') {
                const rampRange = Big(feature.properties.area_);
    
                switch (value) {
                    case '0-50':
                    return rampRange.lt(50);
                    case '50-200':
                    return rampRange.gte(50) && rampRange.lt(200);
                    case '200-526':
                    return rampRange.gte(200);
                }
            }
    
            // Check for material
            return feature.properties[type] === value;
        }

        return inViewport;
    })
    geojson.totalFeatures = geojson.features.length;

    return geojson;
}


export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'INIT_DATA': {
            stateJS.data = action.payload;

            return fromJS(stateJS);
        }
        case 'INIT_COORDINATES':
        case 'COORDINATES_UPDATED': {
            stateJS.northEast = action.payload._northEast;
            stateJS.southWest = action.payload._southWest;
            
            return fromJS(stateJS);
        }
        case 'SHOW_MODAL': {
            stateJS.mapData = filterMaterialsRamps(stateJS.data, stateJS.northEast, stateJS.southWest, action.payload.type, action.payload.value);
            stateJS.showModal = true;

            return fromJS(stateJS);
        }
        case 'CLOSE_MODAL': {
            stateJS.showModal = false;

            return fromJS(stateJS);
        }
        default: 
        return fromJS(stateJS);
    }
    
}