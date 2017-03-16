import { combineReducers } from 'redux';
import Auth from './Auth';
import Todo from './Todo';
import Navigation from './Navigation';

export default combineReducers({
    Todo,
    Auth,
    nav: Navigation
});
