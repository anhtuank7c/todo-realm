import { TODO, USER } from './types';

const Todo = {
    name: 'Todo',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', indexed: true },
        content: 'string',
        completed: { type: 'bool', default: false },
        // issuer: { type: USER, optional: true },
        // assignee: { type: USER, optional: true },
        createdAt: { type: 'date', default: new Date(), optional: true },
        updatedAt: { type: 'date', optional: true }
    }
};

export { Todo };
