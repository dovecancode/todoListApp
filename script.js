import getTheCurrentGate from './date.js'
getTheCurrentGate()

// get
const todoForm = document.getElementById('form')
const todoInput = document.getElementById('todoInput')
const todoList = document.querySelector('.todo__list')
let todaysDate = document.getElementById('todaysDate')

const fragment = document.createDocumentFragment()

let todos = [
  { id: 1, item: 'php', status: false },
  { id: 2, item: 'javascript', status: false },
]
eventListener()
function eventListener() {
  todoForm.addEventListener('submit', submitTodos)
}

function submitTodos(e) {
  e.preventDefault()
  const item = todoInput.value

  const todo = {
    id: crypto.randomUUID(),
    item,
    status: false,
  }
  todos.push(todo)

  uiRenderTodos()

  this.reset()
}

uiRenderTodos()
function uiRenderTodos() {
  const htmlTagLi = document.createElement('li')

  htmlTagLi.classList.add('bounceIn')

  todos.forEach((todo) => {
    htmlTagLi.innerHTML = `<div class="list">
    <form>
      <input type="text" class="text" value="${todo.item}" readonly />
    </form>
  </div>
  <div class="options">
    <span id="check" title="Done"><i class="fa fa-check"></i></span>
    <span id="edit" title="Edit"><i class="fa fa-edit"></i></span>
    <span id="trash" title="Delete"><i class="fa fa-trash"></i></span>
  </div>`
  })

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
