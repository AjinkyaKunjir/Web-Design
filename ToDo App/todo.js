// Define UI Vars
const form = document.querySelector('#task-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#task');
const author = document.getElementById("author").value;
const time =  new Date();
var taskname= "Task : ";
var authorname= "Created by : ";
var createdtime= "Creation Date : ";


//new XHR request object
var request = new XMLHttpRequest();

//GET method to open and get data from json file
request.open('GET', 'todo.json', true);

request.onload = function () {
	//read the json file
	var data = JSON.parse(this.response);

	for (var i = 0; i < data.length; i++) {
   
    // Create element
   const li = document.createElement('li');
   // Add class
   li.className = 'collection-item';
   const br = document.createElement('br');
  const br1 = document.createElement('br');
   // Create text node and append to element
   li.appendChild(document.createTextNode(taskname + data[i].name));
   li.appendChild(br);
   li.appendChild(document.createTextNode(authorname + data[i].author));
   li.appendChild(br1);
   li.appendChild(document.createTextNode(createdtime + data[i].time));
   // Create new link element
   const link = document.createElement('a');
   // Class for deleting element
   link.className = 'delete-item secondary-content';
   // Icon to delete the item 
   link.innerHTML = '<i class="fa fa-remove"></i>';
   
   li.appendChild(link);
 
   todoList.appendChild(li);
  
	}
}

request.send();

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Persist the local storage data
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  todoList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
    let tasks;
 if(localStorage.getItem('tasks')===null){
     tasks=[];
 } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
     //alert(localStorage.getItem('tasks'));
 } 

 tasks.forEach(function(task){
     // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  todoList.appendChild(li);
 });
}
// Add Task
function addTask(e) {
  if(todoInput.value === '') {
    alert('Please add a task!');
  }

  // Create li element
  const li = document.createElement('li');
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const br = document.createElement('br');
  const br1 = document.createElement('br');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  
  li.appendChild(div1.appendChild(document.createTextNode(taskname + todoInput.value)));
  li.appendChild(br);
  li.appendChild(div2.appendChild(document.createTextNode(authorname + author)));
  li.appendChild(br1);
  li.appendChild(div3.appendChild(document.createTextNode(createdtime + time.toLocaleString()))) 
  
  
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  todoList.appendChild(li);

  //Store Task in local storage
  storeTaskInLocalStorage(todoInput.value);

  // Clear input
  todoInput.value = '';

  e.preventDefault();
}

//Store Tasks
function storeTaskInLocalStorage(task){
 let tasks;
 if(localStorage.getItem('tasks')===null){
     tasks=[];
 } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 tasks.push(task);

 localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Do you want to delete this task ?')) {
      e.target.parentElement.parentElement.remove();
      //remove from LS
      removeTaskfromlocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS 
function removeTaskfromlocalStorage(taskItem){
    let tasks;
 if(localStorage.getItem('tasks')===null){
     tasks=[];
 } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
 }
 tasks.forEach(function(task, index){
    if(taskItem.textContent===task){
        tasks.splice(index, 1);
    }
 });

 localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks() {
  // todoList.innerHTML = '';

  // Faster
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    
    const item = task.firstChild.textContent;
    
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
    });
    console.log(text);
}