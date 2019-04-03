import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import FiltersReducer from './reducers/FiltersReducer';
import MapReducer from './reducers/MapReducer';

const rootReducer = combineReducers({
    map: MapReducer,
    filters: FiltersReducer
})
const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
