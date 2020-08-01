import './task-list.sass';
import { Task } from '../task/task';

/**
 * Represents a class to work with the task list. Listens to events that are generated
 * on the task list, and then adds, deletes, completes, and updates tasks.
 */
export class TaskList {
    constructor(layout, eventEmitter) {
        this.layout = layout;
        this.eventEmitter = eventEmitter;

        this.eventEmitter.on('todoListCreated', this.loadTaskList);
        this.eventEmitter.on('taskCreated', this.addTask);

        this.layout.addEventListener('click', this.deleteTask);
        this.layout.addEventListener('click', this.completeTask);
        this.layout.addEventListener('click', this.changeTaskDescription);
        this.layout.addEventListener('input', this.saveTaskOnInput);
        this.layout.addEventListener('keypress', this.saveTaskOnEnter);
    }

    /**
     * Loads the new task list from the Todo List that was retrieved from the database.
     * @param {{taskList: [], id: string, title: string}} payload - A todo list.
     */
    loadTaskList = payload => {
        payload.taskList.forEach(task => {
            if (!task.deleted) this.layout.append(Task.getTaskLayout(null, task));
        })
    }

    /**
     * Appends the new task to the task list. The task layout is generated by the
     * static getTaskLayout method from the Task object.
     * @param {{id: string, description: string, active: boolean, deleted: boolean, isInput: boolean}} task - The new task.
     */
    addTask = task => this.layout.append(Task.getTaskLayout(null, task))

    /**
     * Deletes the selected task from the list.
     * @param {MouseEvent} event - A mouse click event.
     */
    deleteTask = event => {
        const target = event.target;
        if (target.classList.contains('checkbox__delete-task')) {
            const task = target.closest('.task');
            task.parentNode.removeChild(task);
            this.eventEmitter.emit('taskDeleted', task.id);
        }
    }

    /**
     * Changes the task state from active to inactive and vice versa.
     * @param {MouseEvent} event - A mouse click event.
     */
    completeTask = event => {
        const target = event.target;

        if (target.classList.contains('checkbox__complete-task')) {
            const task = target.closest('.task');
            if (task.classList.contains('completed')) {
                task.classList.remove('completed');
                this.eventEmitter.emit('taskActiveStateUpdated', { id: task.id, active: true });
            } else {
                task.classList.add('completed');
                this.eventEmitter.emit('taskActiveStateUpdated', { id: task.id, active: false });
            }
        }
    }

    /**
     * Replaces the current task span with the task input to let the user change the task description.
     * @param {KeyboardEvent} event - A keyboard event.
     */
    changeTaskDescription = event => {
        const target = event.target;
        if (target.tagName === 'LABEL' || target.tagName === 'INPUT' && target.type === 'checkbox') return;

        const closestTask = target.closest('.task');
        const taskInput = closestTask.querySelector('.input__task-text');

        // Stop execution if the click was inside the task layout, but there's already an input instead of a span.
        if (closestTask && taskInput) return;

        const payload = {
            id: closestTask.id,
            description: closestTask.querySelector('.task-text').innerText,
            isInput: true
        }

        closestTask.parentNode.replaceChild(Task.getTaskLayout(closestTask, payload), closestTask);
        this.eventEmitter.emit('taskInputCreated', payload);
    }

    /**
     * Emits the new task description. The task input is replaced with the task span in the end.
     * @param {KeyboardEvent} event - A keyboard event.
     */
    saveTaskOnEnter = event => {
        const target = event.target;
        const closestTask = target.closest('.task');

        if (target.classList.contains('input__task-text') && !!closestTask && event.key === 'Enter') {
            const payload = {
                id: closestTask.id,
                description: target.value,
                isInput: false
            }

            closestTask.parentNode.replaceChild(Task.getTaskLayout(closestTask, payload), closestTask);
            this.eventEmitter.emit('taskTextUpdated', payload);
        }
    }

    /**
     * Emits the task description upon each keystroke.
     * @param {KeyboardEvent} event - A keyboard event.
     */
    saveTaskOnInput = event => {
        const isInput = event.type === 'input';
        const isEnterKey = event.key !== 'Enter';
        const target = event.target;
        const closestTask = target.closest('.task');
        const taskInput = target.classList.contains('input__task-text');

        if (taskInput && closestTask && isInput && isEnterKey) {
            this.eventEmitter.emit('taskTextUpdated', {
                id: closestTask.id,
                description: target.value,
                isInput: true
            });
        }
    }
}
