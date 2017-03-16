import { LOGIN_SUCCESS, LOGIN_ERROR } from '../action/types';
const INITIAL = {
    user: null,
    error: null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload };
        case LOGIN_ERROR:
            return { ...state, user: null, error: action.payload };
        default:
            return state;
    }
};
