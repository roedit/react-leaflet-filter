import { fromJS } from 'immutable';
import Big from 'big.js';

const initialState = fromJS({
    data: {},
    filteredData: {},
    materials: {},
    ranges: {
      "0-50": 0,
      "50-200": 0,
      "200-526": 0  
    },
    northEast: {
        lat: 0,
        lng: 0
    },
    southWest: {
        lat: 0,
        lng: 0
    }
})

function setRanges(data) {
    const ranges = {
        "0-50": 0,
        "50-200": 0,
        "200-526": 0  
    };

    data.features.forEach(feature => {
        const rampRange = Big(feature.properties.area_);

        if(rampRange.lt(50)) {
            ranges["0-50"]++;
        }

        if(rampRange.gte(50) && rampRange.lt(200)) {
            ranges["50-200"]++;
        }

        if(rampRange.gte(200)) {
            ranges["200-526"]++;
        }
    })

    return ranges;
}

function setMaterials(data) {
    let materials = {};

    data.features.forEach(feature => {
        const rampMaterial = feature.properties.material;
        const materialKey = rampMaterial.replace(/\s/g, '');

        materialKey in materials ? materials[materialKey].count++ : materials[materialKey] = {
            material: rampMaterial,
            count: 1
        }
    })

    return materials;
}

function filterRamps(data, northEast, southWest) {
    const neLat = Big(northEast.lat);
    const neLng = Big(northEast.lng);
    const swLat = Big(southWest.lat);
    const swLng = Big(southWest.lng);
    const geojson = Object.assign({}, data)

    geojson.features = data.features.filter(feature => {
        const coordinates = feature.geometry.coordinates[0]
        let inViewport = false;
        
        // Convert this to a for and break if one found
        coordinates[0].forEach(coordinate => {
            const lng = Big(coordinate[0]);
            const lat = Big(coordinate[1]);
            
            if((neLat.gt(lat) && swLat.lt(lat)) && (neLng.gt(lng) && swLng.lt(lng))) {
                inViewport = true;
            }
        })

        return inViewport
    })
    geojson.totalFeatures = geojson.features.length;

    return geojson;
}

export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'INIT_DATA': {
            stateJS.data = action.payload;
            //TODO: filteredData should be set only when we have coordinates
            stateJS.filteredData = action.payload;
            stateJS.materials = setMaterials(stateJS.data);
            stateJS.ranges = setRanges(stateJS.data);
            
            return fromJS(stateJS);
        }
        case 'COORDINATES_UPDATED': {
            stateJS.northEast = action.payload._northEast;
            stateJS.southWest = action.payload._southWest;
            stateJS.filteredData = filterRamps(stateJS.data, stateJS.northEast, stateJS.southWest);
            stateJS.materials = setMaterials(stateJS.filteredData);
            stateJS.ranges = setRanges(stateJS.filteredData);

            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
    
}