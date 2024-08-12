// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import { thunk } from 'redux-thunk'; // Corrija a importação do thunk
import { persistStore, persistReducer } from 'redux-persist';
import LZString from 'lz-string';

const persistConfig = {
    key: 'root',
    storage: {
        getItem: (key) => {
            return new Promise((resolve, reject) => {
                try {
                    const compressed = localStorage.getItem(key);
                    const decompressed = compressed ? LZString.decompressFromUTF16(compressed) : null;
                    resolve(decompressed);
                } catch (error) {
                    reject(error);
                }
            });
        },
        setItem: (key, value) => {
            return new Promise((resolve, reject) => {
                try {
                    const compressed = LZString.compressToUTF16(value);
                    localStorage.setItem(key, compressed);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        removeItem: (key) => {
            return new Promise((resolve, reject) => {
                try {
                    localStorage.removeItem(key);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
    },
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
