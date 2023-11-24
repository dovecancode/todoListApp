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

  // events for todo delete, edit, status done or undone
  todoList.addEventListener('click', listOptions)
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
  htmlTagLi.setAttribute('data-id', todo.id)
  htmlTagLi.classList.add('bounceIn')

  if (todo.status) {
    htmlTagLi.classList = 'checked'
    htmlTagLi.innerHTML = `
    <div class="list">
      <form>
        <input type="text" class="text" value="${todo.item}" readonly />
      </form>
    </div>
    <div class="options">
      <span id="undo" title="Undo"><i class="fas fa-undo"></i></span>
      <span id="trash" title="Delete"><i class="fa fa-trash"></i></span>
    </div>`
  } else {
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
  }

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

function listOptions(event) {
  // delete Event
  deleteTodo(event)
  // edit event
  initEdit(event)
  // todoStatus
  todoStatus(event)
}

function todoStatus(event) {
  const doneBtn = event.target.closest('#check')
  const undoBtn = event.target.closest('#undo')

  if (!doneBtn && !undoBtn) return
  const htmlTagLi = event.target.closest('li')
  const id = htmlTagLi.dataset.id

  const index = todos.findIndex((todo) => todo.id === id)

  todos[index].status = !todos[index].status
  // rerender data from localstorage
  reRenderTodoList()
}

function reRenderTodoList() {
  // delete every first element in UL element
  while (todoList.firstElementChild) {
    todoList.removeChild(todoList.firstChild)
  }

  // rerender todo from localstorage this will trigger only if status was click
  renderTodoFromStorage()

  const htmlTagList = Array.from(todoList.children)
  htmlTagList.forEach((li) => {
    li.classList.remove('bounceIn')
  })

  // update status to false or true everytime todostatus function execute
  localStorage.setItem('todos', JSON.stringify(todos))
}

function initEdit(event) {
  const editBtn = event.target.closest('#edit')

  if (!editBtn) return
  const htmlTagLi = event.target.closest('li')

  // const formEdit = htmlTagLi.querySelector('form')
  const editInput = htmlTagLi.querySelector('input')
  const startAtEnd = editInput.value.length

  // temporarily deleting options
  editBtn.parentElement.classList.remove('options')
  editBtn.parentElement.classList.add('none')

  if (editInput.hasAttribute('readonly')) {
    // remove readonly state
    editInput.removeAttribute('readonly')

    // put the cursor to the end of the text
    editInput.setSelectionRange(startAtEnd, startAtEnd)

    editInput.focus()
    editInput.style.color = '#fca1a1'
  }
  // function for actual edit
  editAction(htmlTagLi, editInput)
}

function editAction(el, input) {
  const forms = todoList.querySelectorAll('form')

  forms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      // bring back the status,edit and delete button
      const options = el.querySelector('.none')
      options.classList.remove('none')
      options.classList.add('options')

      // bring back the input to the default state readonly
      input.setAttribute('readonly', '')
      input.style.color = 'white'

      // execute the actual edit to the specific item
      const id = el.dataset.id
      const idx = todos.findIndex((todo) => todo.id === id)
      todos[idx].item = input.value
      localStorage.setItem('todos', JSON.stringify(todos))
    })
  })
}

function deleteTodo(event) {
  const trashBtn = event.target.closest('#trash')

  if (!trashBtn) return

  const htmlTagLi = event.target.closest('li')

  htmlTagLi.classList.remove('bounceIn')
  htmlTagLi.classList.add('bounceOutDown')

  const id = htmlTagLi.dataset.id

  todos = todos.filter((todo) => todo.id !== id)

  localStorage.setItem('todos', JSON.stringify(todos))

  setTimeout(() => {
    htmlTagLi.remove()
    if (todos.length === 0) {
      todoList.innerHTML = '<p class="empty_message">Todos will go here</p>'
    }
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
