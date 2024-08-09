import DepositosActionTypes from './action-types';

const initialState = {
    depositos: [],
};

const DepositosReducer = (state = initialState, action) => {
    switch (action.type) {
        case DepositosActionTypes.GET:
            return {
                ...state,
                depositos: action.payload,
            };
        case DepositosActionTypes.UPDATE:
            return {
                ...state,
                depositos: state.depositos.map(user => {
                    if (user.ID === action.payload.userId) {
                        return {
                            ...user,
                            contratos: user.contratos.map(contrato =>
                                contrato.IDCOMPRA === action.payload.contratoUpdated.IDCOMPRA
                                    ? action.payload.contratoUpdated
                                    : contrato
                            ),
                        };
                    }
                    return user;
                }),
            };
        case DepositosActionTypes.UPDATE_DEPOSITO:
            return {
                ...state,
                depositos: state.depositos.map(deposito =>
                    deposito.IDCOMPRA === action.payload.IDCOMPRA
                        ? { ...deposito, ...action.payload }
                        : deposito
                ),
            };
        default:
            return state;
    }
};

export default DepositosReducer;
