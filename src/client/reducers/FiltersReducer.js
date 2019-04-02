import { fromJS } from 'immutable';

const initialState = fromJS({})

export default function(state = initialState, action) {
    let stateJS = state.toJS()

    switch (action.type) {
        case 'ZOOM_UPDATE': {
            return fromJS(stateJS);
        }

        default: 
        return fromJS(stateJS);
    }
    
}