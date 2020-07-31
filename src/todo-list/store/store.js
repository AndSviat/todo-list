/**
 * Saves the new application state in the local storage.
 */
export class Store {
    constructor(eventEmitter) {
        this.db = this.getData() || {
            addTodoListBtn: true
        };
        this.eventEmitter = eventEmitter;

        this.eventEmitter.on('todoListCreated', this.saveTodoList.bind(this));
        this.eventEmitter.on('todoListDeleted', this.deleteTodoList.bind(this));
        this.eventEmitter.on('todoListUpdated', this.saveTodoList.bind(this));
        this.eventEmitter.on('taskCreated', this.saveTask.bind(this));
        this.eventEmitter.on('taskUpdated', this.updateTask.bind(this));
        this.eventEmitter.on('taskDeleted', this.deleteTask.bind(this));
        this.eventEmitter.on('taskInputCreated', this.saveTaskInput.bind(this));
        this.eventEmitter.on('taskTextUpdated', this.updateTaskText.bind(this));

        this.db.addTodoListBtn ? this.eventEmitter.emit('addTodoListBtnActive') : undefined;
    }

    /**
     * Obtains the application state from the local storage.
     * @return {any} application state
     */
    getData() {
        return JSON.parse(localStorage.getItem('db'));
    }

    /**
     * Saves a new todo list.
     * @param todoList new todo list
     */
    saveTodoList(todoList) {
        this.db.todoList = todoList;
        this.db.addTodoListBtn = false;
        localStorage.setItem('db', JSON.stringify(this.db));
    }

    /**
     * Deletes todo list.
     */
    deleteTodoList() {
        this.db.todoList = null;
        this.db.addTodoListBtn = true;
        localStorage.setItem('db', JSON.stringify(this.db));
        this.eventEmitter.emit('addTodoListBtnActive');
    }

    /**
     * Saves a new task.
     * @param payload [object] - the new task object
     */
    saveTask(payload) {
        this.db.todoList.taskList.push(payload.getTaskObj());
        this._save();
    }

    /**
     * Updates the task state from active to inactive and vice versa.
     * @param payload [object] - the task to be updated and the current active or inactive state
     */
    updateTask(payload) {
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
     * Updates the text of the task
     * @param payload [object] - current task
     */
    updateTaskText(payload) {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === payload.id) {
                console.log('found task by id', payload.id, 'text', payload.text);
                taskList[i].description = payload.text;
                taskList[i].isInput = payload.isInput;
                break;
            }
        }
        this._save();
    }

    /**
     * Deletes a task from the local storage. The actual deletion never happens; only the state
     * of the task changes: the task becomes deleted and inactive.
     * @param id [string] - the id of the task
     */
    deleteTask(id) {
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
     * @param id [string] the id of the task
     */
    saveTaskInput(id) {
        const taskList = this.db.todoList.taskList;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].isInput = true;
                break;
            }
        }
        this._save();
    }

    _save() {
        localStorage.setItem('db', JSON.stringify(this.db));
    }
}
