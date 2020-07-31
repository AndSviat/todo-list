import { Task } from '../task/task';

/**
 * Creates a class to work with the task list. Listens to any events that are generated
 * on the task list. Can add, delete, complete, and update tasks.
 */
export class TaskList {
    constructor(layout, eventEmitter) {
        this.layout = layout;
        this.eventEmitter = eventEmitter;

        this.eventEmitter.on('todoListCreated', this.loadTaskList.bind(this));
        this.eventEmitter.on('taskCreated', this.addTask.bind(this));
        this.layout.addEventListener('click', this.deleteTask.bind(this));
        this.layout.addEventListener('click', this.completeTask.bind(this));
        this.layout.addEventListener('click', this.changeTaskDescription.bind(this));
        this.layout.addEventListener('input', this.saveTaskOnInput.bind(this));
        this.layout.addEventListener('keypress', this.saveTaskOnEnter.bind(this));
    }

    loadTaskList(payload) {
        this.taskList = payload.taskList;

        this.taskList.forEach(task => {
            if (!task.deleted) this.layout.append(new Task(task).getTaskLayout());
        });
    }

    addTask(task) {
        this.layout.append(task.getTaskLayout());
    }

    deleteTask(event) {
        const target = event.target;
        if (target.classList.contains('checkbox__delete-task')) {
            const task = target.closest('.task');
            task.parentNode.removeChild(task);
            this.eventEmitter.emit('taskDeleted', task.id);
        }
    }

    completeTask(event) {
        const target = event.target;

        if (target.classList.contains('checkbox__complete-task')) {
            const task = target.closest('.task');
            if (task.classList.contains('completed')) {
                task.classList.remove('completed');
                this.eventEmitter.emit('taskUpdated', { id: task.id, active: true });
            } else {
                task.classList.add('completed');
                this.eventEmitter.emit('taskUpdated', { id: task.id, active: false });
            }
        }
    }

    changeTaskDescription(event) {
        console.log('click inside changeTaskDescription');
        const target = event.target;
        console.log(target.tagName, target.type);
        if (target.tagName === 'LABEL' || target.tagName === 'INPUT' && target.type === 'checkbox') return;

        console.log('clicked inside changeTaskDescription, tag and target', target.tagName, target);
        const closestTask = target.closest('.task');
        const taskInput = closestTask.querySelector('#input__task-text');

        if (!!closestTask && !!taskInput) return;

        const id = closestTask.id;
        const taskDescription = closestTask.querySelector('.task__description');
        const taskText = closestTask.querySelector('.task-text').innerText;

        taskDescription.parentNode.replaceChild(Task.getTaskInputLayout(taskDescription, id, taskText), taskDescription);
        this.eventEmitter.emit('taskInputCreated', id);
    }

    saveTaskOnEnter(event) {
        const target = event.target;
        const closest = target.closest('.task__description');
        if (target.classList.contains('input__task-text') && !!closest) {
            const id = closest.closest('.task').id;
            const text = target.value;

            if (event.key === 'Enter') {
                closest.parentNode.replaceChild(Task.getNewTaskLayout(closest, target.value), closest);
                this.eventEmitter.emit('taskTextUpdated', {id, text, isInput: false});
            }
        }
    }

    saveTaskOnInput(event) {
        const type = event.type;
        const key = event.key;
        const target = event.target;
        const closest = target.closest('.task__description');
        if (target.classList.contains('input__task-text') && !!closest) {
            const id = closest.closest('.task').id;
            const text = target.value;
            if (type === 'input' && key !== 'Enter') this.eventEmitter.emit('taskTextUpdated', {id, text, isInput: true});
        }
    }
}
