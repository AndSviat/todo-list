import { Task } from '../task/task';

export class TaskCreator {
    constructor(layout, eventEmitter) {
        this.layout = layout;
        this.eventEmitter = eventEmitter;

        this.layout.addEventListener('click', this.createTask.bind(this));
    }

    createTask(event) {
        const target = event.target;
        if (target.classList.contains('btn__add-task')) {
            const taskInput = target.closest('.form__create-task')
                .querySelector('.input__new-task');

            this.eventEmitter.emit('taskCreated', new Task({active: true, deleted: false, description: taskInput.value, isInput: false}));
            taskInput.value = '';
        }
    }
}
