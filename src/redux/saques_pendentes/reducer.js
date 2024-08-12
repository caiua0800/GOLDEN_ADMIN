import SaquesPendentesActionTypes from './action-types';

const initialState = {
    saques: [],
};

const SaquesPendentesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SaquesPendentesActionTypes.GET:
            return {
                ...state,
                saques: action.payload,
            };
        case SaquesPendentesActionTypes.UPDATE:
            return {
                ...state,
                saques: state.saques.map(user => {
                    if (user.ID === action.payload.userId) {
                        return {
                            ...user,
                            SAQUES: action.payload.updatedSaques,
                        };
                    }
                    return user;
                }),
            };
        default:
            return state;
    }
};

export default SaquesPendentesReducer;
