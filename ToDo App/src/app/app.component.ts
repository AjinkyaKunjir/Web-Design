import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {

  todos: Todo[];
  selectedTodo: Todo;
  
  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  ngOnInit(): void {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

  removeTodoItem(todo: Todo): void {
    const index: number = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }  
  }

  toggleTodoItem(todo: Todo): void {
    if (todo.done) {
      todo.done = false;
    }
    else todo.done = true;

  }

}


