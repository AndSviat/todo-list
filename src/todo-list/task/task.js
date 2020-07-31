import taskLayout from './task.html';
import taskInputLayout from './task-input.html';
import { generateId } from '../helpers/helpers';

/**
 * Create a task instance or returns a layout for the task depending on the requirements.
 */
export class Task {
    constructor(task) {
        this.task = !task.id ? {...task, id: generateId()} : task;
    }

    /**
     * Creates a new layout for task upon taskCreated event issued by the TaskCreator.
     *
     * @return {HTMLDivElement} container for the task with the task itself
     */
    getTaskLayout() {
        const container = document.createElement('div');
        container.id = this.task.id;
        const completedClass = this.task.active ? 'placeholder' : 'completed';
        container.classList.add('task', completedClass);
        this._getTaskLayout(container);

        return container;
    }

    getTaskObj() {
        return this.task;
    }

    _getTaskLayout(container) {
        container.innerHTML = taskLayout
            .replace('{{task}}', this.task.description)
            .replace('id="checkbox__complete-task"', `id="checkbox__complete-task-${this.task.id}"`)
            .replace('for="checkbox__complete-task"', `for="checkbox__complete-task-${this.task.id}"`)
            .replace('id="checkbox__delete-task"', `id="checkbox__delete-task-${this.task.id}"`)
            .replace('for="checkbox__delete-task"', `for="checkbox__delete-task-${this.task.id}"`);

        if (this.task.isInput) {
            Task.getTaskInputLayout(container.querySelector('.task__description'), this.task.id, this.task.description);
        }
        container.querySelector('.checkbox__complete-task').checked = !this.task.active;
    }

    static getTaskInputLayout(container, id, value) {
        container.innerHTML = taskInputLayout
            .replace('for="input__task-text"', `for="input__task-text-${id}"`)
            .replace('<span class="task-text">', `<input type="text" id="input__task-text-${id}"`)
            .replace('</span>', '');
        container.querySelector('.input__task-text').value = value;
        return container;
    }

    static getNewTaskLayout(container, text) {
        container.innerHTML = `<span class="task-text">${text}</span>`;

        return container;
    }
}
