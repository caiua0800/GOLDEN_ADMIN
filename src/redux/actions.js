import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../DATABASE/firebaseConfig';
import userActionTypes from './user/action-types';
import DepositosActionTypes from './Depositos/action-types';
import SaquesActionTypes from './saques/action-types'; 
import axios from 'axios';


export const loginUser = (email, password, setLoad) => {
    return async (dispatch) => {
        const auth = getAuth();

        await signInWithEmailAndPassword(auth, "caiuabrandao@gmail.com", "Caiua@2017");
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
        // Referência à coleção 'USERS'
        const usersCollectionRef = collection(db, 'USERS');

        // Obter todos os documentos da coleção 'USERS'
        const querySnapshot = await getDocs(usersCollectionRef);

        // Inicializar a variável para armazenar a soma dos valores
        let totalValorSacado = 0;

        // Iterar sobre cada documento e somar o valor do campo 'VALORSACADO'
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.VALORSACADO) {
                totalValorSacado += userData.VALORSACADO;
            }
        });

        // Retornar a soma total
        return totalValorSacado;
    } catch (error) {
        console.error('Erro ao obter o valor total sacado:', error);
        throw error;
    }
};

export const getDepositos = () => {
    return async (dispatch) => {
        try {
            console.log('Fetching deposits from backend...');
            const response = await axios.get('http://localhost:4000/clientes/obterDepositos');

            // Verifique o status da resposta
            if (response.status === 200) {
                const uniqueDeposit = response.data;
                console.log('Unique Deposit Data:', uniqueDeposit);

                dispatch({
                    type: DepositosActionTypes.GET,
                    payload: uniqueDeposit
                });
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        } catch (error) {
            // Melhore a mensagem de erro
            console.error('Error fetching deposit data:', error.message || error);
        }
    };
};



export const getSaques = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:4000/clientes/obterSaques');
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


export const setAceito = (userId, contratoId, aceito) => {
    return async (dispatch) => {
        try {

            axios.post('http://localhost:4000/clientes/editarContrato', {
                docId: userId,
                IDCONTRATO: contratoId,
                fieldName: "STATUS",
                fieldNewValue: aceito ? 1 : 3,
            })


            const response = await axios.get('http://localhost:4000/clientes/obterDepositos');

            if (response.status === 200) {
                const updatedContratos = response.data;

                // Dispara uma ação Redux para indicar que o status foi atualizado com sucesso
                dispatch({
                    type: DepositosActionTypes.UPDATE,
                    payload: { userId, updatedContratos }
                });
            }



        } catch (error) {
            console.error('Error updating contrato status:', error);
        }
    };
};

function convertStringToNumber(str) {
    // Remove os pontos
    const withoutDots = str.replace(/\./g, '');
    // Substitui a vírgula por um ponto
    const withDot = withoutDots.replace(',', '.');
    // Converte a string para um número
    return parseFloat(withDot);
}

// actions.js
export const setAceitoSaques = (userId, saqueId, aceito, dataSolicitacao, methodPayment, obs, valor, fundo_escolhido) => {
    return async (dispatch) => {
        try {

            axios.post('http://localhost:4000/clientes/editarSaque', {
                docId: userId,
                DATASOLICITACAO: dataSolicitacao,
                fieldName: "STATUS",
                fieldNewValue: aceito ? 2 : 4,
            })

            const response = await fetch('http://localhost:4000/clientes/obterSaques');
            const saquesUpdated = response.data
            dispatch({
                type: SaquesActionTypes.UPDATE,
                payload: { userId, saquesUpdated }
            });

        } catch (error) {
            console.error('Error updating saques status:', error);
        }
    };
};


export const toggleAllowAdminUser = (docId) => {
    return async (dispatch) => {
        try {
            const adminDocRef = doc(db, 'ADMIN', docId); // Obtém a referência para o documento na coleção ADMIN

            const adminDocSnapshot = await getDoc(adminDocRef); // Obtém o snapshot do documento

            if (!adminDocSnapshot.exists()) {
                console.error(`Admin document with ID ${docId} does not exist.`);
                return;
            }

            const adminData = adminDocSnapshot.data(); // Obtém os dados do documento
            const currentAllow = adminData.ALLOW; // Obtém o valor atual de ALLOW

            // Inverte o valor de ALLOW
            const updatedAllow = !currentAllow;

            // Atualiza o documento no Firestore com o novo valor de ALLOW
            await updateDoc(adminDocRef, { ALLOW: updatedAllow });

            // Opcional: Dispara uma ação Redux para indicar que o ALLOW foi atualizado com sucesso
            dispatch({
                type: userActionTypes.SETAUTH, // Defina seu tipo de ação conforme necessário
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
            // Cria o usuário no Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);

            // Cria o documento na coleção ADMIN com o doc.id sendo o CPF
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
            // Você pode adicionar tratamentos de erro adicionais aqui conforme necessário
        }
    };
};

export const getAdminData = async () => {
    try {
        // Enviar a requisição para a rota /getAdminData
        const response = await axios.get('http://localhost:4000/clientes/getAdminData');

        // Retornar os dados extraídos da resposta
        return {
            totalCoinsPlataforma: response.data.totalCoinsPlataforma,
            totalSaldoPlataforma: response.data.totalSaldoPlataforma,
            totalDeGanhosPlataforma: response.data.totalDeGanhosPlataforma,
            totalDeValoresDeSaquesFeitos: response.data.totalDeValoresDeSaquesFeitos,
        };
    } catch (error) {
        console.error('Error fetching admin data:', error);
        // Retornar um objeto com dados default ou uma mensagem de erro
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

}

