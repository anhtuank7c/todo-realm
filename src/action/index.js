import Realm from 'realm';
import { LOAD, INSERT, UPDATE, DELETE } from './types';
import { User, Todo } from '../schema';
import { TODO } from '../schema/types';
import Utils from '../Utils';

// Get the default Realm with support for our objects
const realm = new Realm({
    schema: [Todo]
});

// default sortBy parameters
const SORT_BY = [
    ['completed', false],
    ['updatedAt', true]
];

export const loadTodo = (sortBy = SORT_BY) => {
    return {
        type: 'LOAD',
        payload: realm.objects('Todo').sorted(sortBy)
        // meta: {
        //     onSuccess: (result) => logSuccess(result),
        //     onFailure: (error) => logError(error),
        // }
    };
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
