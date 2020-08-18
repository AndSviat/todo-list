export class ErrorHandler {
    constructor(eventEmitter) {
        eventEmitter.on('taskTitleInvalid', this.showInvalidTaskMessage);
    }

    showInvalidTaskMessage = ({taskTitle, taskInput}) => {
        taskInput.classList.add('input__new-task__invalid');
        console.error(`Task title is invalid: ${taskTitle}`);
    }
}
