import { TaskList } from './task-list/task-list';
import { TaskCreator } from './task-creator/task-creator';
import TodoListLayout from './todo-list.html';
import { generateId } from './helpers/helpers';

export class TodoList {
    constructor(todoList = null, eventEmitter) {
        this.todoList = todoList || {
            id: generateId(),
            title: 'Todo List Title',
            taskList: []
        };
        this.layout = this.generateTodoListLayout();
        this.taskList = new TaskList(this.layout.querySelector('[data-role=task-list]'), eventEmitter);
        this.taskCreator = new TaskCreator(this.layout.querySelector('[data-role=task-creator]'), eventEmitter);
        this.eventEmitter = eventEmitter;
        this.body = document.body;

        this.layout.addEventListener('click', this.deleteTodoList.bind(this));
    }

    appendTodoListLayout() {
        this.eventEmitter.emit('todoListCreated', this.todoList);
        this.body.append(this.layout);
    }

    generateTodoListLayout() {
        const todoListLayout = document.createElement('div');
        todoListLayout.id = 'todo-list-' + this.todoList.id;
        todoListLayout.classList.add('todo-list');
        todoListLayout.dataset.role = 'todo-list';
        todoListLayout.innerHTML = TodoListLayout;

        return todoListLayout;
    }

    deleteTodoList(event) {
        const target = event.target;
        if (target.classList.contains('btn__delete-todo-list')) {
            const todoList = target.closest('.todo-list');
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
