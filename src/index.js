import './styles.sass';
import { TodoList } from './todo-list/todo-list';
import { EventEmitter } from './todo-list/event-emitter/event-emitter';
import { Store } from './todo-list/store/store';

const eventEmitter = new EventEmitter();
eventEmitter.on('addTodoListBtnActive', showAddTodoListBtn);

const store = new Store(eventEmitter);
const todoList = store.db.todoList;

if (todoList) {
    new TodoList(todoList, eventEmitter).appendTodoListLayout();
}

function showAddTodoListBtn() {
    const addTodoListBtn = document.createElement('button');
    addTodoListBtn.innerText = 'add todo list';
    addTodoListBtn.classList.add('btn__add-todo-list');

    addTodoListBtn.addEventListener('click', event => {
        new TodoList(null, eventEmitter).appendTodoListLayout();
        addTodoListBtn.parentNode.removeChild(addTodoListBtn);
    });
    document.body.prepend(addTodoListBtn);
}
