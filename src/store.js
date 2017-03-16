import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducer';

const middlewares = [thunk];
if (__DEV__) {
    middlewares.push(createLogger({}));
}
const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
);

export default store;
