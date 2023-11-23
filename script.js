import getTheCurrentGate from './date.js'
getTheCurrentGate()

// get
const todoForm = document.getElementById('form')
const todoInput = document.getElementById('todoInput')
const todoList = document.querySelector('.todo__list')

console.log(todoList)

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

  this.reset()
}

uiRenderTodos()
function uiRenderTodos() {
  const htmlTagLi = document.createElement('li')

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
