import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import FiltersReducer from './reducers/FiltersReducer';
import MapReducer from './reducers/MapReducer';
import ModalReducer from './reducers/ModalReducer';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    typography: {
        fontSize: 12,
    },
    palette: {
        type: 'dark',
        background: {
            default: '#020710',
            paper: '#101624',
        },
        text: {
            default: '#c2c5cc',
        }
    }
});

const rootReducer = combineReducers({
    map: MapReducer,
    modal: ModalReducer,
    filters: FiltersReducer
})
const store = createStore(rootReducer);

ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <React.Fragment>
            <CssBaseline />
            <App/>
        </React.Fragment>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
