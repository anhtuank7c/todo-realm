import Realm from 'realm';
import { NavigationActions } from 'react-navigation';
import { LOAD, INSERT, UPDATE, DELETE, LOGIN_ERROR, LOGIN_SUCCESS } from './types';
import { User, Todo } from '../schema';
import { TODO } from '../schema/types';
import Utils from '../Utils';

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
                            type: LOGIN_ERROR,
                            payload: error.message
                        });
                    } else {
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: u
                        });
                    }
                });
            } else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user
                });
            }
        });
    };
};

export const loadTodo = (sortBy = SORT_BY) => {
    return {
        type: LOAD,
        payload: realm.objects('Todo').sorted(sortBy)
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
        type: 'INSERT',
        promise: realm.write(() => {
            realm.create('Todo', {
                id,
                content,
                completed
            });
        }),
        payload: realm.objects('Todo').filtered(`id = '${id}'`)
        // meta: {
        //     onSuccess: (result) => logSuccess(result),
        //     onFailure: (error) => logError(error),
        // }
    };
};
