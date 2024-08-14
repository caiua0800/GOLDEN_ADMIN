import SaquesActionTypes from './action-types';

const initialState = {
    saques: [],
};

const SaquesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SaquesActionTypes.GET:
            return {
                ...state,
                saques: action.payload,
            };
        case SaquesActionTypes.UPDATE:
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
        case SaquesActionTypes.UPDATE_ONE:
            console.log(`Atualizando saque ${action.payload.DATA_SOLICITACAO}: `)
            console.log(`${action.payload.updatedSaque}`)
            return {
                ...state,
                saques: state.saques.map(saque => {
                    if (saque.DATASOLICITACAO === action.payload.DATASOLICITACAO) {
                        return {
                            ...saque,
                            ...action.payload.updatedSaque,
                        };
                    }
                    return saque;
                }),
            };
        case SaquesActionTypes.ADD:
            console.log("Adicionando saque no redux:", action.payload);
            return {
                ...state,
                saques: [...state.saques, action.payload], // Adiciona o novo saque ao array de saques
            };
        default:
            return state;
    }
};

export default SaquesReducer;
