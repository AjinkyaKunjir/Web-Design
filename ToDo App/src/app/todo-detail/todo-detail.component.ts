import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  @Input() todo: Todo;
  constructor() { }

  save() {
    this.todo.updated = new Date();
  }

  ngOnInit() {
  }

}
