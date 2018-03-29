import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodoItem() {
    this.getTodos();
    let newTodo: Todo = new Todo();
    newTodo.id = this.todos.length + 1;
    newTodo.title = (<HTMLInputElement>document.getElementById('title')).value;
    newTodo.authorname = (<HTMLInputElement>document.getElementById('author')).value;
    newTodo.description = (<HTMLInputElement>document.getElementById('task')).value;
    newTodo.updated = new Date();
    newTodo.done = false;

    this.todos.push(newTodo);
    this.clearFields();
    return this;
  }
  
  clearFields() {
    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("task")).value = "";
  }

  ngOnInit() {
  }

}
