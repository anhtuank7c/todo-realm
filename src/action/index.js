import Realm from 'realm';
import { LOAD, INSERT, UPDATE, DELETE, LOGIN_ERROR, LOGIN_SUCCESS } from './types';
import { Todo } from '../schema';
import { TODO } from '../schema/types';
import Utils from '../Utils';
import store from '../store';

// Get the default Realm with support for our objects
// Realm.Sync.User.logout();

// Realm.Sync.User.register('http://127.0.0.1:9080', 'anhtuank7c@gmail.com', '1234567', (error, us) => {
//     if (error) throw error;
// });
// Realm.Sync.User.login('http://127.0.0.1:9080', 'anhtuank7c@gmail.com', '1234567', (error, u) => {
//     if (error) throw error;
// });
const realm = new Realm({
    // sync: {
    //     user: Realm.Sync.User.current,
    //     url: 'realm://127.0.0.1/~/Demo'
    // },
    schema: [Todo]
});

// default sortBy parameters
const SORT_BY = [
    ['completed', false],
    ['updatedAt', true]
];

export const login = ({ email, password }) => {
    return (dispatch) => {
        Realm.Sync.User.login('http://127.0.0.1:9080', email, password, (err, user) => {
            if (err) {
                Realm.Sync.User.register('http://127.0.0.1:9080', email, password, (error, u) => {
                    if (error) {
                        dispatch({
                            type: 'login_error',
                            payload: error.title
                        });
                        console.log('register', error.title);
                    } else {
                        dispatch({
                            type: 'login_success',
                            payload: u
                        });
                        console.log('register OK', u);
                        console.log(store.getState());
                        store.getState().nav.routes.push({ routeName: 'List' });
                    }
                });
            } else {
                dispatch({
                    type: 'login_success',
                    payload: user
                });
                console.log('login OK', user);
                console.log(store.getState());
                store.getState().nav.routes.push({ routeName: 'List' });
            }
        });
    };
};

export const loadTodo = (sortBy = SORT_BY) => {
    return {
        type: LOAD,
        payload: realm.objects(TODO).sorted(sortBy)
    };
    // return {
    //     type: 'LOAD',
    //     promise: realm.objects('Todo').sorted(sortBy),
    //     meta: {
    //         onSuccess: (result) => logSuccess(result),
    //         onFailure: (error) => logError(error),
    //     }
    // };
};

export const saveTodo = ({ content, completed }) => {
    const id = Utils.guid();
    return {
        type: INSERT,
        payload: realm.write(() => {
            realm.create(TODO, {
                id,
                content,
                completed
            });
        }),
        // meta: {
        //     onSuccess: (result) => logSuccess(result),
        //     onFailure: (error) => logError(error),
        // }
    };
};
