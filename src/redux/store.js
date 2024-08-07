// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { thunk } from 'redux-thunk'; // Importar thunk como uma exportação nomeada

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
