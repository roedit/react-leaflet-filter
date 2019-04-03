import { fromJS } from 'immutable';

const initialState = fromJS({
    data: {},
    position: {
        lat: -27.8975,
        lng: 153.2932,
    },
    zoom: 10
})

export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'INIT_DATA': {
            stateJS.data = action.payload;
            
            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
    
}