import update from 'immutability-helper';

/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
    return [
        {
            id: 1,
            text: 'Learn Javascript',
            completed: false,
            priority: 'Medium',
            dueDate: '2024-01-01'
        },
        {
            id: 2,
            text: 'Learn React',
            completed: false,
            priority: 'High',
            dueDate: '2024-01-05'
        },
        {
            id: 3,
            text: 'Build a React App',
            completed: false,
            priority: 'Low',
            dueDate: '2024-01-10'
        }
    ];
}

/**
 * Get a single item by ID.
 * @param {Number} itemId
 * @return {Object}
 */
export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

/**
 * Update the status (completed/pending) of a specific item.
 * @param {Array} items
 * @param {Number} itemId
 * @param {Boolean} completed
 * @return {Array}
 */
export function updateStatus(items, itemId, completed) {
    const index = items.findIndex(item => item.id === itemId);

    if (index === -1) return items; // If item not found, return original list.

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: { $set: completed }
        }
    });
}

/**
 * A counter to generate a unique ID for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */
let todoCounter = 1;

function getNextId() {
    return getAll().length + todoCounter++;
}

/**
 * Adds a new item to the list and returns the updated list (immutable).
 * Supports adding priority and due date.
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export function addToList(list, data) {
    const { text, priority = 'Medium', dueDate = '' } = data;

    const item = {
        id: getNextId(),
        text,
        completed: false,
        priority,
        dueDate: dueDate || 'No Due Date' // Default to "No Due Date" if empty
    };

    return [...list, item]; // Immutable addition
}

/**
 * Sort tasks by Due Date.
 * @param {Array} tasks
 * @param {String} order - 'asc' for ascending, 'desc' for descending.
 * @return {Array}
 */
export function sortByDueDate(tasks, order = 'asc') {
    return tasks.slice().sort((a, b) => {
        const dateA = new Date(a.dueDate || '9999-12-31');
        const dateB = new Date(b.dueDate || '9999-12-31');
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
}

/**
 * Sort tasks by Priority (High > Medium > Low).
 * @param {Array} tasks
 * @return {Array}
 */
export function sortByPriority(tasks) {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    return tasks.slice().sort((a, b) => {
        const priorityA = priorityOrder[a.priority] || 4;
        const priorityB = priorityOrder[b.priority] || 4;
        return priorityA - priorityB; 
    });
}
