// redux/root-reducer.js
import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import DepositosReducer from './Depositos/reducer';
import SaquesReducer from './saques/reducer';
// import SaquesPendentesReducer from './saques_pendentes/reducer';
import clientsReducer from './clients/reducer';

const rootReducer = combineReducers({
    userReducer,
    DepositosReducer,
    SaquesReducer,
    clients: clientsReducer,
    // SaquesPendentesReducer
});

export default rootReducer;
