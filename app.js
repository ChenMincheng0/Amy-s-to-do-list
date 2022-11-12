//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Light & dark
const body = document.querySelector("body");
const toggle = document.querySelector("#toggle")
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
    body.classList.toggle("dark");
    sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";  
});





// Funtctions
function addTodo(event) {
    //Prevent form from submitt
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement('li');    
    if (todoInput.value === "") {
        alert('Please input task');
        return false;
    } 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
     
    //add todo to localstorage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear Todo Input Value
    todoInput.value = "";
}


function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });

    }
    //check mark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none" ;
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
} 


function saveLocalTodos(todo) {
    // check Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    // check Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Creat Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);  
    });
}

function removeLocalTodos(todo){
      // check Do I already have thing in there?
      let todos;
      if(localStorage.getItem('todos') === null) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem('todos'));
      }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
