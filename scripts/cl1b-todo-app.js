//working with strict mode
'use strict';

//1. Fetch existing todos from localStorage
const todos = getSavedTodos();
console.log(todos);

const filters = {
  searchText: '',
  hideCompleted: false,
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters); //re-render of renderTodos function
});

document
  .querySelector('#hide-completed')
  .addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });

//create new todo
document.querySelector('#todo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoText.value,
    completed: false,
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.todoText.value = '';
});
