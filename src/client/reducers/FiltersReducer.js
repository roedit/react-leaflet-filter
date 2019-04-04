import { fromJS } from 'immutable';
import Big from 'big.js';

const initialState = fromJS({
    data: {},
    materials: {},
    ranges: {},
    northEast: {},
    southWest: {}
})

function filterRamps(data, northEast, southWest) {
    const neLat = Big(northEast.lat);
    const neLng = Big(northEast.lng);
    const swLat = Big(southWest.lat);
    const swLng = Big(southWest.lng);
    let geojson = Object.assign({}, data)
    let materials = {};
    let ranges = {
        '0-50': {
            name: '0-50',
            area: 0
        },
        '50-200': {
            name: '50-200',
            area: 0
        },
        '200-526': {
            name: '200-526',
            area: 0
        }  
    };

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

            // Setup materials
            materialKey in materials ? materials[materialKey].count++ : materials[materialKey] = {
                material: rampMaterial,
                count: 1
            }

            // Setup ranges
            if(rampRange.lt(50)) {
                ranges['0-50'].area++;
            }

            if(rampRange.gte(50) && rampRange.lt(200)) {
                ranges['50-200'].area++;
            }

            if(rampRange.gte(200)) {
                ranges['200-526'].area++;
            }
        }

        return inViewport
    })
    geojson.totalFeatures = geojson.features.length;

    // Format materials
    let filteredMaterials = [];
    Object.keys(materials).map(material => filteredMaterials.push(materials[material]));

    // Format ranges
    let filteredRanges = [];
    Object.keys(ranges).map(area => filteredRanges.push(ranges[area]));

    return { filteredMaterials, filteredRanges };
}

export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        // For concurrency between mapload and data load
        case 'INIT_DATA': {
            stateJS.data = action.payload;
            if((Object.keys(stateJS.northEast).length > 0) && (Object.keys(stateJS.southWest).length > 0)) {
                const chartData = filterRamps(stateJS.data, stateJS.northEast, stateJS.southWest);

                stateJS.materials = chartData.filteredMaterials;
                stateJS.ranges = chartData.filteredRanges;
            }
            
            return fromJS(stateJS);
        }
        case 'INIT_COORDINATES': {
            stateJS.northEast = action.payload._northEast;
            stateJS.southWest = action.payload._southWest;
            if(Object.keys(stateJS.data).length > 0) {
                const chartData = filterRamps(stateJS.data, stateJS.northEast, stateJS.southWest);

                stateJS.materials = chartData.filteredMaterials;
                stateJS.ranges = chartData.filteredRanges;
            }
            
            return fromJS(stateJS);
        }
        case 'COORDINATES_UPDATED': {
            stateJS.northEast = action.payload._northEast;
            stateJS.southWest = action.payload._southWest;

            const chartData = filterRamps(stateJS.data, stateJS.northEast, stateJS.southWest);

            stateJS.materials = chartData.filteredMaterials;
            stateJS.ranges = chartData.filteredRanges;

            return fromJS(stateJS);
        }
        default: 
        return fromJS(stateJS);
    }
    
}