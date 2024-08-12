import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../DATABASE/firebaseConfig';
import userActionTypes from './user/action-types';
import DepositosActionTypes from './Depositos/action-types';
import SaquesActionTypes from './saques/action-types'; 
import SaquesPendentesActionTypes from './saques_pendentes/action-types'; 
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_OBTER_DEPOSITOS = process.env.REACT_APP_API_OBTER_DEPOSITOS;
const API_OBTER_SAQUES = process.env.REACT_APP_API_OBTER_SAQUES;
const API_EDITAR_CONTRATO = process.env.REACT_APP_API_EDITAR_CONTRATO;
const API_EDITAR_SAQUE = process.env.REACT_APP_API_EDITAR_SAQUE;
const API_GET_ADMIN_DATA = process.env.REACT_APP_API_GET_ADMIN_DATA;
const API_GET_CONTRATO = process.env.REACT_APP_PESQUISAR_CONTRATO;
const API_OBTER_SAQUES_PENDENTES = process.env.REACT_APP_API_OBTER_SAQUES_PENDENTES

export const loginUser = (email, password, setLoad) => {
    return async (dispatch) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        dispatch({
            type: userActionTypes.LOGIN,
            payload: { EMAIL: email, PASS: password }
        });
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        const auth = getAuth();
        try {
            await signOut(auth);
            dispatch({
                type: userActionTypes.LOGOUT,
                payload: null
            });
            localStorage.removeItem('user');
            localStorage.removeItem('cpf');
            window.location.href = '/';
        } catch (error) {
            console.error("Error signing out", error);
        }
    };
};

export const getTotalValorSacado = async () => {
    try {
        const usersCollectionRef = collection(db, 'USERS');
        const querySnapshot = await getDocs(usersCollectionRef);
        let totalValorSacado = 0;
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.VALORSACADO) {
                totalValorSacado += userData.VALORSACADO;
            }
        });
        return totalValorSacado;
    } catch (error) {
        console.error('Erro ao obter o valor total sacado:', error);
        throw error;
    }
};

export const getDepositos = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_OBTER_DEPOSITOS}`);
            if (response.status === 200) {
                const depositos = response.data;
                dispatch({
                    type: DepositosActionTypes.GET,
                    payload: depositos
                });
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        } catch (error) {
            console.error('Error fetching deposit data:', error.message || error);
        }
    };
};

export const getSaques = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_OBTER_SAQUES}`);
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos saques: ' + response.statusText);
            }
            const saques = await response.json();
            
            dispatch({
                type: SaquesActionTypes.GET,
                payload: saques
            });
        } catch (error) {
            console.error('Erro ao obter dados dos saques:', error);
        }
    };
};

export const getSaquesPendentes = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_OBTER_SAQUES_PENDENTES}`);
            if (!response.ok) {
                throw new Error('Erro ao obter dados dos saques: ' + response.statusText);
            }
            const saques = await response.json();
          
            dispatch({
                type: SaquesPendentesActionTypes.GET,
                payload: saques
            });
        } catch (error) {
            console.error('Erro ao obter dados dos saques:', error);
        }
    };
};

export const setAceito = (userId, contratoId, aceito) => {
    return async (dispatch) => {
        try {
            // Atualizar o contrato no backend
            const response = await axios.post(`${API_BASE_URL}${API_EDITAR_CONTRATO}`, {
                docId: userId,
                IDCONTRATO: contratoId,
                fieldName: "STATUS",
                fieldNewValue: aceito ? 1 : 3,
            });

            // Obter o contrato editado
            const contratoUpdatedResponse = await axios.post(`${API_BASE_URL}${API_GET_CONTRATO}`, {
                userId,
                contratoId
            });

            if (contratoUpdatedResponse.status === 200) {
                const contratoUpdated = contratoUpdatedResponse.data;
                dispatch({
                    type: DepositosActionTypes.UPDATE,
                    payload: { userId, contratoUpdated }
                });
            } else {
                console.error('Erro ao obter contrato atualizado:', contratoUpdatedResponse.status);
            }
        } catch (error) {
            console.error('Erro ao atualizar o contrato:', error);
        }
    };
};


export const setAceitoSaques = (userId, saqueId, aceito, dataSolicitacao, methodPayment, obs, valor, fundo_escolhido) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${API_EDITAR_SAQUE}`, {
                docId: userId,
                DATASOLICITACAO: dataSolicitacao,
                fieldName: "STATUS",
                fieldNewValue: aceito ? 2 : 4,
            });

            if (response.status === 200) {
                const responseFetch = await fetch(`${API_BASE_URL}${API_OBTER_SAQUES}`);
                const saquesUpdated = await responseFetch.json();
                dispatch({
                    type: SaquesActionTypes.UPDATE,
                    payload: { userId, saquesUpdated }
                });
            } else {
                console.error('Failed to update saque status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating saques status:', error);
        }
    };
};

export const toggleAllowAdminUser = (docId) => {
    return async (dispatch) => {
        try {
            const adminDocRef = doc(db, 'ADMIN', docId);
            const adminDocSnapshot = await getDoc(adminDocRef);
            if (!adminDocSnapshot.exists()) {
                console.error(`Admin document with ID ${docId} does not exist.`);
                return;
            }
            const adminData = adminDocSnapshot.data();
            const currentAllow = adminData.ALLOW;
            const updatedAllow = !currentAllow;
            await updateDoc(adminDocRef, { ALLOW: updatedAllow });
            dispatch({
                type: userActionTypes.SETAUTH,
                payload: { docId, updatedAllow }
            });
        } catch (error) {
            console.error('Error updating ALLOW:', error);
        }
    };
};

export const createUser = (name, cpf, email, contact, cargo, password) => {
    return async (dispatch) => {
        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'ADMIN', cpf), {
                NAME: name,
                CPF: cpf,
                EMAIL: email,
                CONTACT: contact,
                CARGO: cargo,
                ALLOW: false
            });
            dispatch({
                type: userActionTypes.CREATE,
                payload: { NAME: name, CPF: cpf, EMAIL: email, CONTACT: contact, CARGO: cargo, ALLOW: false }
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
};

export const getAdminData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}${API_GET_ADMIN_DATA}`);
        return {
            totalCoinsPlataforma: response.data.totalCoinsPlataforma,
            totalSaldoPlataforma: response.data.totalSaldoPlataforma,
            totalDeGanhosPlataforma: response.data.totalDeGanhosPlataforma,
            totalDeValoresDeSaquesFeitos: response.data.totalDeValoresDeSaquesFeitos,
        };
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return {
            totalCoinsPlataforma: 0,
            totalSaldoPlataforma: 0,
            totalDeGanhosPlataforma: 0,
            totalDeValoresDeSaquesFeitos: 0,
            error: 'Failed to fetch admin data',
        };
    }
};

export const consultarALLOWSELL = (dateString) => {
    if (dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today < inputDate;
    } else {
        return false;
    }
};

export const updateDepositoSuccess = (deposito) => ({
    type: DepositosActionTypes.UPDATE_DEPOSITO,
    payload: deposito,
});