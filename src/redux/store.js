import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import {thunk} from 'redux-thunk'; // Corrigi a importação do thunk

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
