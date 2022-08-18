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
