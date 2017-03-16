import Realm from 'realm';
import { LOAD, INSERT, UPDATE, DELETE } from './types';
import { User, Todo } from '../schema';
import { TODO } from '../schema/types';

// Get the default Realm with support for our objects
const realm = new Realm({
    schema: [User, Todo]
});

// default sortBy parameters
const SORT_BY = [
    ['completed', false],
    ['updatedAt', true]
];

export default loadTodo = (sortBy = SORT_BY) => {
    return {
        type: LOAD,
        promise: realm.objects(TODO).sorted(sortBy)
        // meta: {
        //     onSuccess: (result) => logSuccess(result),
        //     onFailure: (error) => logError(error),
        // }
    };
};
