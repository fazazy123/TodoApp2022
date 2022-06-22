//styling with todo app
'use strict';

//1. Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todoJSON = localStorage.getItem('todos');
  try {
    return todoJSON ? JSON.parse(todoJSON) : [];
  } catch (error) {
    return [];
  }
};

//2. Save todos to localStorage
const saveTodos = (todos) =>
  localStorage.setItem('todos', JSON.stringify(todos));
// render aplliation  todos based onfiltfer 
// challenge area
// 1. if todos to  show, render them else pwith classs "empty -message "and massaege
// "no todos- to shows
// 2.store this document .query selector ("todo)" lline of codeinto a variable
  
const renderTodos = (todos, filters) => {
  const todoE1= document.querySelector('#todos')
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  filteredTodos = filteredTodos.filter((todo) => {
    return filters.hideCompleted ? !todo.completed : true;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todoE1.innerHTML = '';

  const summary = generateSummaryDOM(incompleteTodos)
  todoE1 .appendChild(summary);

  if(filteredTodos.length>0){
    filteredTodos.forEach((todo) => {
      const p = generateTodoDOM(todo);
      todoE1.appendChild(p);
    });
  }else{
      const messageE1=document.createElement("p") ;
      messageE1.textContent="No todos to show";
      messageE1.classList.add("empty-message"); // js css
      todoE1.appendChild(messageE1);
  };
 
};

//Toggle the completed value for a give todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

const generateTodoDOM = (todo) => {
  // setup todo check box
  const todoE1=document.createElement("label");
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  //setup todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  containerEl .appendChild(checkbox);
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', (e) => {
    // console.log('welcome');
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //setup todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);
  // setup container and add jss css
  todoE1.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoE1.appendChild(containerEl); // add two js css class selector


  //setup remove button
  removeButton.textContent = 'x';
  removeButton.classList.add("button","button--text");
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  todoE1.appendChild(removeButton);

  return todoE1;
};

//5. Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h3');
  const plural =incompleteTodos.length===1 ? "": "s"

  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  summary.classList.add("list-title");// js css class selector
  return summary;
};
