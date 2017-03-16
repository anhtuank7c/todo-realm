import { applyMiddleware, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducer';

/**
 * Note reduxPackMiddleware should probably be one of the first middleware to run, 
 * here it would run just after thunk and before logger.
 */
const middlewares = [thunk, reduxPackMiddleware];
if (__DEV__) {
    middlewares.push(createLogger());
}
const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
);

export default store;
