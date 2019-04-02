import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import FiltersReducer from './reducers/FiltersReducer';

const store = createStore(FiltersReducer);

ReactDOM.render(
<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
