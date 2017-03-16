// import { LOGIN_SUCCESS, LOGIN_ERROR } from '../action/types';

const INITIAL = {
    user: null,
    error: null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'login_success':
            return { ...state, user: action.payload };
        case 'login_error':
            return { ...state, user: null, error: action.payload };
        default:
            return state;
    }
};
