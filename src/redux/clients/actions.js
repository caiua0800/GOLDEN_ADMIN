import axios from 'axios';

export const fetchClientsRequest = () => ({
    type: 'FETCH_CLIENTS_REQUEST'
});

export const fetchClientsSuccess = (clients) => ({
    type: 'FETCH_CLIENTS_SUCCESS',
    payload: clients
});

export const fetchClientsFailure = (error) => ({
    type: 'FETCH_CLIENTS_FAILURE',
    payload: error
});

export const fetchClients = () => {
    return async (dispatch) => {
        dispatch(fetchClientsRequest());
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_GET_CLIENTS}`);
            dispatch(fetchClientsSuccess(response.data));
        } catch (error) {
            dispatch(fetchClientsFailure(error.message));
        }
    };
};
