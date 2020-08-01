import './todo-list.sass';
import TodoListLayout from './todo-list.html';
import { TaskList } from './task-list/task-list';
import { TaskCreator } from './task-creator/task-creator';
import { generateId } from './helpers/helpers';

/**
 * The TodoList class creates a new instance of a todo list and handles the global todo list state.
 */
export class TodoList {
    constructor(todoList = null, eventEmitter) {
        this.todoList = todoList || this.createNewTodoList();
        this.eventEmitter = eventEmitter;
        this.layout = this.generateTodoListLayout();
        this.taskList = new TaskList(this.layout.querySelector('[data-role=task-list]'), eventEmitter);
        this.taskCreator = new TaskCreator(this.layout.querySelector('[data-role=task-creator]'), eventEmitter);

        this.layout.addEventListener('click', this.deleteTodoList);
    }

    /**
     * Creates a new todo list.
     * @return {{taskList: [], id: string, title: string}} - A new todo list object.
     */
    createNewTodoList() {
        return {
            id: generateId(),
            title: 'Todo List Title',
            taskList: []
        }
    }

    /**
     * Appends a new todo list layout to the HTML BODY element.
     */
    appendTodoListLayout = () => {
        this.eventEmitter.emit('todoListCreated', this.todoList);
        document.body.append(this.layout);
    }

    /**
     * Generates a new Todo List layout based on the TodoListLayout template.
     * @return {HTMLDivElement} todoListLayout - A new todo list layout.
     */
    generateTodoListLayout = () => {
        const todoListLayout = document.createElement('div');
        todoListLayout.id = `todo-list-${this.todoList.id}`;
        todoListLayout.classList.add('todo-list');
        todoListLayout.dataset.role = 'todo-list';
        todoListLayout.innerHTML = TodoListLayout;

        return todoListLayout;
    }

    /**
     * Deletes the selected Todo List from the body.
     * @param {MouseEvent} event - A mouse click event on the Delete Todo List button.
     */
    deleteTodoList = event => {
        const target = event.target;

        if (target.classList.contains('btn__delete-todo-list')) {
            const todoList = target.closest(`#todo-list-${this.todoList.id}`);
            this.eventEmitter.emit('todoListDeleted', this.todoList.id);
            todoList.parentNode.removeChild(todoList);
        }
    }

    // updateTitle(event) {
    //     if (event.target.classList.contains('todo-list__title-input')) {
    //         console.log(this.todoList);
    //         this.eventEmitter.emit('todoListUpdated', {
    //             ...this.todoList, title: event.target.value
    //         });
    //     }
    // }
}
