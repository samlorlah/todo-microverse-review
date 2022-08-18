import Todos from './todo.js';

const todoInput = document.querySelector('.todo-input');
const addTodoBtn = document.querySelector('#todo-add-btn');
const clearAllCompletedBtn = document.querySelector('.clear-all-completed p');

const todos = new Todos();

todos.getTasks();

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const index = todos.tasks.length + 1;
  if (todoInput.value !== '') {
    const newTask = {
      description: todoInput.value,
      completed: false,
      index,
    };
    todos.addTask(newTask);
    todoInput.value = '';
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodoBtn.click();
  }
});

clearAllCompletedBtn.addEventListener('click', () => {
  todos.clearAllCompleted();
});
