
const input = document.getElementById('todo');
const add = document.getElementById('add');
const ul = document.querySelector('.todo-body');

let okBtns;
let delBtns;
let editBtns;
let lists;

function startLS() {

    const todos = JSON.parse(localStorage.getItem('todos'));
    
    if(!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    }
    else {
        todos.forEach(todo => {
            addHTML(todo)
        })
        delBtns = document.querySelectorAll('#del');
                
        delBtns.forEach(btn => btn.addEventListener('click', todoDel));
    }
}
startLS();

function addHTML (todo) {

    ul.innerHTML += `
    <li class="todo-item">
    <div class="todoText">${todo.text}</div>
        <div class="btn">
            <button id="del">Del</button>
            <button id="edit">Edit</button>
            <button type="button" id="ok">Ok</button>
        </div>
    </li>`
    

    lists = document.querySelectorAll('li')
    delBtns = document.querySelectorAll('#del');
    editBtns = document.querySelectorAll('#edit');
    okBtns = document.querySelectorAll('#ok');

    todoCheck(lists);

    delBtns.forEach(btn => btn.addEventListener('click', todoDel));
    editBtns.forEach(edit => edit.addEventListener('click', todoEdit))
    okBtns.forEach(ok => ok.addEventListener('click', editOk))

}

// Enter
input.addEventListener('keypress', (e) =>{
    if(e.key == 'Enter') {
        let todo = input.value;
        addTodo(todo);
    }
})

// Add Click
add.addEventListener('click', () => {

    let todo = input.value;
    todo = todo.trim()

    inputControl(todo)
})

// Add To Do
function addTodo(todoText) {

    const todo = {
        text: todoText,
        isComplete: false
    }
    
    addHTML(todo);

    input.value= "";
    
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

// Delete To Do
 function todoDel(e) {
     const todo = e.target.parentElement.parentElement;
     const text = (todo.firstChild.nextSibling.innerText).trim();
     
    let todos = JSON.parse(localStorage.getItem('todos'));

    let filteredTodos;
    filteredTodos = todos.filter(todo => todo.text != text);
    
    localStorage.setItem('todos', JSON.stringify(filteredTodos))
    todo.remove();
 }

// Check To Do
function todoCheck(item) {
            
    for (i = 0; i < item.length; i++){
        
        item[i].addEventListener('click', (e) => {
            const divText = e.target.children[0]

            if(divText) {
                
                divText.classList.toggle('checked');
                e.target.classList.toggle('checked');
                return
            }
        })
    }
}

// Input Control
function inputControl (todo) {
    if(!input.value) {
        input.value = 'please enter a task'
        setTimeout(() => input.value = "", 1000)
    } else {
        
        addTodo(todo)
    }
}

// Edit To Do
function todoEdit (e) {

        const todo = e.target.parentElement.parentElement;
        const text = todo.firstChild.nextSibling.innerHTML;
        input.value = text;
        
        editOk()
}

// Edit Ok
function editOk() {
    
    lists.forEach(list => {
        if(input.value === list.firstElementChild.textContent) {

            input.addEventListener('change', e => {
                list.firstElementChild.textContent = e.target.value;
            })
        }
    })
}

localStorage.setItem('todo', JSON.stringify(todo));
const todoObj = JSON.parse(localStorage.getItem('todo'));