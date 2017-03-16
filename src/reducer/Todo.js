import { handle } from 'redux-pack';
import { LOAD, DELETE, UPDATE, INSERT } from '../action/types';

const INITIAL = {
    isLoading: false,
    error: null,
    todos: []
};

export default (state = INITIAL, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD:
            return handle(state, action, {
                start: prevState => {
                    return { ...prevState, isLoading: true, error: null, todos: [] };
                },
                finish: prevState => {
                    return { ...prevState, isLoading: false };
                },
                failure: prevState => {
                    return { ...prevState, isLoading: false, error: payload };
                },
                success: prevState => {
                    return { ...prevState, isLoading: false, error: null, todos: payload };
                },
            });
        default:
            return state;
    }
};
