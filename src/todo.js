import updateStatus from './status.js';

const listContainer = document.querySelector('.lists');
const todoInput = document.querySelector('.todo-input');
const addTodoBtn = document.querySelector('#todo-add-btn');
const clearAllCompletedBtn = document.querySelector('.clear-all-completed p');

export default class Todos {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  displayList(task) {
    const list = document.createElement('li');
    list.setAttribute('dataindex', task.index);

    const taskContainer = document.createElement('div');
    taskContainer.id = `task-${task.index}`;
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.className = task.completed ? 'task-complete check hide' : 'task-complete check';
    taskContainer.appendChild(check);

    const checkIconContainer = document.createElement('span');
    checkIconContainer.className = !task.completed ? 'hide' : '';
    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa fa-check list-drag-btn check check-icon';
    checkIconContainer.appendChild(checkIcon);
    taskContainer.appendChild(checkIconContainer);

    const text = document.createElement('input');
    text.setAttribute('type', 'text');
    text.className = task.completed ? 'todo-input-edit completed' : 'todo-input-edit';
    text.value = task.description;
    taskContainer.appendChild(text);

    list.appendChild(taskContainer);

    const dragBtn = document.createElement('span');
    dragBtn.className = 'list-drag-btn';
    const dragIcon = document.createElement('i');
    dragIcon.className = 'fa fa-ellipsis-vertical';
    dragBtn.appendChild(dragIcon);

    const trashBtn = document.createElement('span');
    const trashIcon = document.createElement('i');
    trashBtn.className = 'list-delete-btn hide';
    trashIcon.className = 'fa fa-trash';
    trashBtn.appendChild(trashIcon);
    list.appendChild(dragBtn);
    list.appendChild(trashBtn);
    listContainer.appendChild(list);
    document.onclick = () => {
      const todoInputs = document.querySelectorAll('.todo-input-edit');
      todoInputs.forEach((input) => {
        const parent = input.parentNode.parentNode;
        const drag = parent.children[1];
        const trash = parent.children[2];
        const completedStatus = input.classList.contains('completed');
        if (input === document.activeElement) {
          drag.classList.add('hide');
          trash.classList.remove('hide');
          input.style.textDecoration = 'none';
        } else {
          drag.classList.remove('hide');
          trash.classList.add('hide');
          if (completedStatus) input.style.textDecoration = 'line-through';
        }
      });
    };

    const inputEdit = list.children[0].children[2];
    inputEdit.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const taskText = inputEdit.value;
        this.editTask(task, taskText);
        e.target.blur();
      }
    });

    trashBtn.addEventListener('click', () => {
      this.removeTask(task);
    });

    check.addEventListener('change', () => {
      this.handleCompleted(task);
    });

    checkIconContainer.addEventListener('click', () => {
      this.handleCompleted(task);
    });
  }

  getTasks() {
    listContainer.innerHTML = '';
    if (localStorage.getItem('todoItems')) {
      this.tasks = JSON.parse(localStorage.getItem('todoItems'));
      this.tasks.sort((a, b) => a.index - b.index);
      this.tasks.forEach((task) => {
        this.displayList(task);
      });
    } else {
      localStorage.setItem('todoItems', '');
      this.tasks = [];
    }
  }

  addTask(task) {
    this.tasks.push(task);
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  removeTask(selectedTask) {
    this.tasks = this.tasks.filter((task) => selectedTask.index !== task.index);
    this.tasks.map((task, index) => {
      task.index = index + 1;
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  editTask(selectedTask, text) {
    this.tasks.map((task) => {
      if (task.index === selectedTask.index) {
        task.description = text;
      }
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  handleCompleted(selectedTask) {
    updateStatus(this.tasks, selectedTask);
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  clearAllCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed === false);
    this.tasks.map((task, index) => {
      task.index = index + 1;
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }
}

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
