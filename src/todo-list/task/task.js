import taskLayout               from './task.html';
import taskInputLayout          from './task-input.html';
import { generateId, idRegExp } from '../helpers/helpers';

/**
 * Creates a task instance or returns a layout for the task depending on the requirements.
 */
export class Task {

    /**
     * Creates a new task with the given description.
     * @param {string} description - A task description.
     * @return {{deleted: boolean, isInput: boolean, active: boolean, description: string, id: string}} - A new task object.
     */
    static createNewTask(description) {
        return {
            active: true,
            deleted: false,
            isInput: false,
            description: description,
            id: generateId()
        }
    }

    /**
     * Creates a new layout for the passed task depending on the task's isInput property.
     * @return {HTMLDivElement} - The container for the task.
     */
    static getTaskLayout(container, payload) {
        let newContainer = container || Task.getNewTaskContainer(payload);

        newContainer = payload.isInput ?
            Task.getTaskInputLayout(newContainer, payload) :
            Task.getTaskSpanLayout(newContainer, payload);

        return newContainer;
    }

    /**
     * Creates a new task container layout to keep the task text, checkboxes, and labels.
     * @param {{deleted: boolean, isInput: boolean, active: boolean, description: string, id: string}} payload - A new task.
     * @return {HTMLDivElement} - The task container.
     */
    static getNewTaskContainer(payload) {
        const container = document.createElement('div');
        container.id = payload.id || generateId();
        container.classList.add('task');
        container.innerHTML = taskLayout.replace(idRegExp, payload.id);

        if (!payload.active) container.classList.add('completed');
        container.querySelector('.checkbox__complete-task').checked = !payload.active;

        return container;
    }

    /**
     * Add the span HTML to the task container.
     * @param {HTMLDivElement} container - task container into which the span is to be added
     * @param {{deleted: boolean, isInput: boolean, active: boolean, description: string, id: string}} payload - The new task to be added.
     * @return {HTMLDivElement} container - The updated container with the task span layout.
     */
    static getTaskSpanLayout(container, payload) {
        container.querySelector('.task__description').innerHTML = `<div class="task__description"><span class="task-text">${payload.description}</span></div>`;

        return container;
    }

    /**
     * Adds the input HTML to the task container.
     * @param {HTMLDivElement} container - task container into which the span is to be added.
     * @param {{deleted: boolean, isInput: boolean, active: boolean, description: string, id: string}} payload - The task to be added.
     * @return {HTMLDivElement} - The updated container with the task input layout.
     */
    static getTaskInputLayout(container, payload) {
        container.querySelector('.task__description').innerHTML = Task.getTaskInput(payload);
        container.querySelector('.input__task-text').value = payload.description;
        return container;
    }

    /**
     * Creates a new task input layout with the given id.
     * @param {{deleted: boolean, isInput: boolean, active: boolean, description: string, id: string}} payload - The task for which input layout is to be created.
     * @return {string} - The new task input layout.
     */
    static getTaskInput(payload) {
        return taskInputLayout.replace(idRegExp, payload.id);
    }
}
