import axios from 'axios';

// Ações síncronas
export const fetchClientsRequest = () => ({
    type: 'FETCH_CLIENTS_REQUEST',
});

export const fetchClientsSuccess = (clients) => ({
    type: 'FETCH_CLIENTS_SUCCESS',
    payload: clients,
});

export const fetchClientsFailure = (error) => ({
    type: 'FETCH_CLIENTS_FAILURE',
    payload: error,
});

export const fetchClients = (tipo) => {
    return async (dispatch, getState) => {

        const { clients } = getState().clients;

        if (clients.length > 0 && tipo === 'novo') {
            console.log(`Já existem clientes`)
            return;
        }
        if(tipo === 'recarregar'){
            console.log('RECARREGANDO')
        }
        dispatch(fetchClientsRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_GET_CLIENTS}`);
            dispatch(fetchClientsSuccess(response.data));
            console.log("Clientes Atualizados")
            
        } catch (error) {
            dispatch(fetchClientsFailure(error.message));
        }
    };
};

// Atualizar cliente específico no estado
export const updateClientInRedux = (client) => ({
    type: 'UPDATE_CLIENT_IN_REDUX',
    payload: client,
});

// Buscar cliente por CPF e atualizar no estado 
export const fetchClientByCpfAndUpdate = (cpf) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PESQUISAR_CLIENTE_CPF}`, 
                { clientId: cpf }  // Corpo da requisição
            );
    
            if (response.status === 200) {
                const updatedClient = response.data;
                dispatch(updateClientInRedux(updatedClient));
            } else {
                console.error('Erro ao buscar o cliente atualizado:', response);
            }
        } catch (error) {
            console.error('Erro ao buscar o cliente atualizado:', error.message);
        }
    };
};
