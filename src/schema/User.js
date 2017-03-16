import { TODO, USER } from './types';

const User = {
    name: 'USER',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', indexed: true },
        name: { type: 'string', optional: true },
        gender: { type: 'string', default: 'M', optional: true },
        todos: { type: 'list', objectType: 'TODO' },
        createdAt: { type: 'date', default: new Date(), optional: true },
        updatedAt: { type: 'date', optional: true }
    }
};

export { User };
