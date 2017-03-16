export default {
    guid: () => {
        const uidTemp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        return uidTemp.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    move: (array, fromIndex, toIndex) => {
        return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    },

    findTodo: (todo, todoList) => {
        return todoList.find(
            (item) => item.title.toLowerCase() === todo.title.toLowerCase()
        );
    }
};
