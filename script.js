import getTheCurrentGate from './date.js'
getTheCurrentGate()

// get
const todoForm = document.getElementById('form')
const todoInput = document.getElementById('todoInput')
const todoList = document.querySelector('.todo__list')
let todaysDate = document.getElementById('todaysDate')

const fragment = document.createDocumentFragment()

let todos = storeTodoInLocalStorage()

eventListener()
function eventListener() {
  // render data from localstorage
  document.addEventListener('DOMContentLoaded', renderTodoFromStorage)

  // todo form submit
  todoForm.addEventListener('submit', submitTodos)
}

function submitTodos(e) {
  e.preventDefault()
  const item = todoInput.value

  if (!item) {
    uiRenderMessage('Please add your todo list', 'alert alert-danger')
    return
  } else {
    const todo = {
      id: crypto.randomUUID(),
      item,
      status: false,
    }
    todos.push(todo)

    uiRenderMessage('Todo added', 'alert alert-success')

    if (todos.length === 1) {
      todoList.innerHTML = ''
    }

    uiRenderTodos(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  this.reset()
}

function uiRenderTodos(todo) {
  const htmlTagLi = document.createElement('li')

  htmlTagLi.classList.add('bounceIn')

  htmlTagLi.innerHTML = `
  <div class="list">
    <form>
      <input type="text" class="text" value="${todo.item}" readonly />
    </form>
  </div>
  <div class="options">
    <span id="check" title="Done"><i class="fa fa-check"></i></span>
    <span id="edit" title="Edit"><i class="fa fa-edit"></i></span>
    <span id="trash" title="Delete"><i class="fa fa-trash"></i></span>
  </div>`

  fragment.appendChild(htmlTagLi)
  todoList.appendChild(fragment)
}

function uiRenderMessage(msg, className) {
  const spanEl = document.createElement('span')
  spanEl.textContent = msg
  spanEl.classList = className

  todaysDate.insertAdjacentElement('afterend', spanEl)

  setTimeout(() => {
    spanEl.remove()
  }, 1000)
}

// localStorage
function storeTodoInLocalStorage() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  return todos
}

function renderTodoFromStorage() {
  if (todos.length === 0) {
    todoList.innerHTML = '<p class="empty_message">Todos will go here</p>'
  } else {
    todos.map((todo) => uiRenderTodos(todo))
  }
}
