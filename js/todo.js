const todoForm = document.querySelector("#todoForm");
const inputTodo = document.querySelector("#inputTodo");
const todoList = document.querySelector("#todoList");
const LIST_NAME = "todos";
let list = [] ;

function handleTodoList(event){
    event.preventDefault();
    const id = new Date().getTime();
    const text = inputTodo.value;
    inputTodo.value="";
    const newObj = {
        text : text,
        id: id
    };

    list.push(newObj);
    paintTodo(newObj);
    saveTodo();
}

function paintTodo(newObj){
    const li = document.createElement("li");
    li.id= newObj.id;
    const span = document.createElement("span");
    span.innerText = newObj.text;
    const button =document.createElement("button");
    button.innerText="x";
    button.addEventListener("click",delTodo);
    li.appendChild(span);
    li.appendChild(button);
    console.log(li);
    todoList.appendChild(li);

}
function saveTodo(){
    localStorage.setItem(LIST_NAME, JSON.stringify(list));
}

function delTodo(event){
    const li = event.target.parentElement;
    li.remove();
    list = list.filter((toDo) => toDo.id !== parseInt(li.id));
    saveTodo();
}

todoForm.addEventListener("submit", handleTodoList);
const savedTodoList = localStorage.getItem(LIST_NAME);

if(savedTodoList!==null){
    const parsedTodos = JSON.parse(savedTodoList);
    list =parsedTodos;
    parsedTodos.forEach(paintTodo);
}