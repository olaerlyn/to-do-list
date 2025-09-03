// Select elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Add new todo
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    saveAndRender();
  }
});

// Toggle or delete todo
list.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const idx = e.target.parentElement.dataset.index;
    todos.splice(idx, 1);
    saveAndRender();
  } else if (e.target.tagName === 'SPAN') {
    const idx = e.target.parentElement.dataset.index;
    todos[idx].completed = !todos[idx].completed;
    saveAndRender();
  }
});

// Save to localStorage and render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Render todos
function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.index = idx;
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete-btn" title="Delete">&#10006;</button>
    `;
    list.appendChild(li);
  });
}