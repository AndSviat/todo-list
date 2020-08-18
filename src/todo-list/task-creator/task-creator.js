import './task-creator.sass';
import { Task } from '../task/task';
import { Validator } from '../validator/validator';

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
            const taskTitle = taskInput.value;

            if (Validator.validateTitle(taskTitle)) {
                this.eventEmitter.emit('taskCreated', Task.createNewTask(taskTitle));
                taskInput.classList.remove('input__new-task__invalid');
                taskInput.value = '';
            } else {
                this.eventEmitter.emit('taskTitleInvalid', {taskTitle, taskInput});
            }
        }
    }
}
