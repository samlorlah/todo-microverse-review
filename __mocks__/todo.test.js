/**
 * @jest-environment jsdom
 */

import Todos from '../src/todo.js';
const getTasksMock = jest.fn().mockReturnValue('');

document.body.innerHTML = `
  <section>
    <div class="header">
      <h3>Today's To Do</h3>
      <i id="list-refresh-btn" class="fa fa-rotate"></i>
    </div>
    <div class="list-input">
      <input type="text" class="todo-input" placeholder="Add to your list..." />
      <div id="todo-add-btn">
        <i class="fa fa-arrow-right-to-bracket"></i>
      </div>
    </div>
    <ul class="lists"></ul>
    <div class="clear-all-completed">
      <p>Clear all completed</p>
    </div>
  </section>
`;

const todos = new Todos();
todos.getTasks = getTasksMock;

describe('todo test', () => {
  window.localStorage = Storage.prototype;
  test('add new task/item to todo', () => {
    const item = {
      description: 'Test item',
      completed: false,
      index: 1,
    };
    const item2 = {
      description: 'Test Item 2',
      completed: false,
      index: 2,
    };
    const item3 = {
      description: 'Test Item 3',
      completed: false,
      index: 3,
    };
    const item4 = {
      description: 'Test Item 4',
      completed: false,
      index: 4,
    };
    todos.addTask(item);
    expect(todos.tasks).toHaveLength(1);
    todos.addTask(item2);
    expect(todos.tasks).toHaveLength(2);
    todos.addTask(item3);
    expect(todos.tasks).toHaveLength(3);
    todos.addTask(item4);
  });

  test('remove task', () => {
    const newTask = {
      description: 'Test Item 5',
      completed: false,
      index: 5,
    };
    todos.addTask(newTask);
    expect(todos.tasks).toHaveLength(5);

    const removeTask = {
      description: 'Test Item 3',
      completed: false,
      index: 3,
    };
    todos.removeTask(removeTask);
    expect(todos.tasks[2].description).toBe('Test Item 4');
    expect(todos.tasks).toHaveLength(4);
  });
});
