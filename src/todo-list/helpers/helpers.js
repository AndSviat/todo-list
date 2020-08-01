/**
 * Generates a unique id to be used as the id for the todo list and tasks.
 * @return {string} - the unique alphanumeric sequence
 */
export function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const idRegExp = /({{id}})+/g;
