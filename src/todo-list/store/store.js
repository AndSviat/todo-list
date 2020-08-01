import { generateId } from '../helpers/helpers';

/**
 * Saves, updates, and deletes parts of the application state in the local storage.
 * Stores internally the state in the db property.
 */
export class Store {
    constructor(eventEmitter) {
        this.db = this.getExistingDatabase() || this.createDatabase();
        this.eventEmitter = eventEmitter;

        this.eventEmitter.on('todoListCreated', this.saveTodoList);
        this.eventEmitter.on('todoListDeleted', this.deleteTodoList);
        this.eventEmitter.on('todoListUpdated', this.saveTodoList);
        this.eventEmitter.on('taskCreated', this.saveTask);
        this.eventEmitter.on('taskActiveStateUpdated', this.updateTaskActiveState);
        this.eventEmitter.on('taskDeleted', this.deleteTask);
        this.eventEmitter.on('taskInputCreated', this.saveTaskInput);
        this.eventEmitter.on('taskTextUpdated', this.updateTaskDescription);

        if (this.db.addTodoListBtn) this.eventEmitter.emit('addTodoListBtnActive');
    }

    /**
     * Creates a new database with generic properties.
     * @return {{todoList: {taskList: [], id: string, title: string}, addTodoListBtn: {active: boolean}}} db - A new database.
     */
    createDatabase = () => {
        return {
            addTodoListBtn: {
                active: true
            },
            todoList: {
                id: generateId(),
                title: 'Todo List',
                taskList: []
            }
        }
    }

    /**
     * Obtains the application state from the local storage.
     * @return {{todoList: {taskList: [], id: string, title: string}, addTodoListBtn: {active: boolean}}} - the application state.
     */
    getExistingDatabase = () => {
        return JSON.parse(localStorage.getItem('db'));
    }

    /**
     * Saves a new todo list and updates the state of the addTodoListBtn to inactive.
     * @param {{taskList: [], id: string, title: string}} todoList - A new todo list.
     */
    saveTodoList = todoList => {
        this.db.todoList = todoList;
        this.db.addTodoListBtn.active = false;
        localStorage.setItem('db', JSON.stringify(this.db));
    }

    /**
     * Deletes todo list from the local storage.
     */
    deleteTodoList = () => {
        this.db.todoList = null;
        this.db.addTodoListBtn.active = true;
        this.eventEmitter.emit('addTodoListBtnActive');
        this._save();
    }

    /**
     * Saves a new task.
     * @param {{id: string, description: string, active: boolean, deleted: boolean, isInput: boolean}} payload - A new task object.
     */
    saveTask = payload => {
        this.db.todoList.taskList.push(payload);
        this._save();
    }

    /**
     * Updates the task state from active to inactive and vice versa.
     * @param {{id: string, active: boolean}} payload - The task to be updated and its current active state.
     */
    updateTaskActiveState = payload => {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === payload.id) {
                taskList[i].active = payload.active;
                break;
            }
        }
        this._save();
    }

    /**
     * Updates the description of the task.
     * @param {{id: string, description: string, isInput: boolean}} payload - The updated task properties.
     */
    updateTaskDescription = payload => {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === payload.id) {
                taskList[i].description = payload.description;
                taskList[i].isInput = payload.isInput;
                break;
            }
        }
        this._save();
    }

    /**
     * Deletes a task from the local storage. The actual deletion never happens - only the state
     * of the task changes: the task becomes deleted and inactive.
     * @param {string} id - The id of the task.
     */
    deleteTask = id => {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].deleted = true;
                taskList[i].active = false;
                break;
            }
        }
        this._save();
    }

    /**
     * Changes the state of a task to input. If the task is in this state, the
     * application renders an input field instead of a span.
     * @param {{id: string, isInput: boolean}} payload - The task id and the current isInput value.
     */
    saveTaskInput = payload => {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === payload.id) {
                taskList[i].isInput = payload.isInput;
                break;
            }
        }
        this._save();
    }

    /**
     * Saves a new database with the updated state.
     * @private
     */
    _save = () => {
        localStorage.setItem('db', JSON.stringify(this.db));
    }
}
