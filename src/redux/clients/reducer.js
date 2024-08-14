const initialState = {
    clients: [],
    loading: false,
    error: null
};

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CLIENTS_REQUEST':
            return {
                ...state,
                loading: false
            };
        case 'FETCH_CLIENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                clients: action.payload
            };
        case 'FETCH_CLIENTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_CLIENT_IN_REDUX':
            return {
                ...state,
                clients: state.clients.map(client =>
                    client.CPF === action.payload.CPF ? action.payload : client
                )
            };
        default:
            return state;
    }
};

export default clientsReducer;
