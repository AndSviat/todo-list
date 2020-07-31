# Todo List

A simple Todo List application built in pure JavaScript.

## Starting the application

1. Install dependencies using Yarn (recommended) or NPM:

```
yarn
# or npm install
```

2. Start the application:

```
yarn start
```

3. Open your application at [http://localhost:8080].

## Technology stack

* JavaScript
* Sass 
* HTML
* Webpack
* Mocha
* Chai

## Functional requirements

As the end user, I want to be able to:

* Create a todo list
* Delete a todo list
* Add a task to a todo-list
* Complete a task in a todo list
* Delete a task from a todo-list
* Update task description

The todo list must be stored in the local storage.

Additional functionality to be developed:

* Add more than one todo list
* Change the name of a todo list
* View all or only active, inactive, or deleted tasks
* Move tasks in a todo list or between todo lists

## Implementation

Classes:

* `TodoList`, creates a new todo list instance and handles all events
    * The `TodoList` class instantiate a new Todo List. The todo list internally creates instances of `TodoListHeader`,
    `TaskList`, and `TaskCreator`, each of which receive their portions of the todo list layout and an instance of 
    EventEmitter. Emits `todoListCreated`, `todoListUpdated`, and `todoListDeleted` events. The `Store` updates
    `localStorage` accordingly.
* `TaskList`, renders the list of tasks and handles all task-related events: update, delete, and complete the tasks
    * Emits `taskCreated`, `taskUpdated`, `taskTextUpdated`, `taskInputCreated`, and `taskDeleted` events. The `Store`
    updates the task state in the `localStorage`.
* `TaskCreator`, emits an event that a new task was created. Emits the `taskCreated` event.
* `Task`, creates a new instance of a task and provides interfaces to generate a layout for the task
* `Store`, handles the global application state, in particular, the state of the AddTodoList button and the todo list itself
* `EventEmitter`, implements the PubSub pattern to let the components communicate with each other
* `Helpers`, contains the functions that can be used by all classes

The components are loosely coupled, and communicate via publishing events with payload. The components that are interested
in the events can react accordingly.

Task object:

Task is responsible for creation of a new Task. Describes the task object:
```ts
function Task() {
    const id = 'random alphanumeric sequence'; // String
    let description = ''; // String
    let isInput = false;  // Boolean, defaults to false
    let active = true;    // Boolean, defaults to true
    let deleted = false;  // Boolean, defaults to false
}
```

## Testing

Currently no tests were written.

[http://localhost:8080]: http://localhost:8080
