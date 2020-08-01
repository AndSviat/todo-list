import './task-creator.sass';
import { Task } from '../task/task';

/**
 * Represents the task creator layout and handles creation of a new task.
 */
export class TaskCreator {
    constructor(layout, eventEmitter) {
        this.layout = layout;
        this.eventEmitter = eventEmitter;

        this.layout.addEventListener('click', this.createTask);
    }

    /**
     * Creates a new task and clears the task input.
     * @param {MouseEvent} event - A mouse click event on the Add Task button.
     */
    createTask = event => {
        const target = event.target;

        if (target.classList.contains('btn__add-task')) {
            const taskInput = target.closest('.form__create-task').querySelector('.input__new-task');

            this.eventEmitter.emit('taskCreated', Task.createNewTask(taskInput.value));
            taskInput.value = '';
        }
    }
}
