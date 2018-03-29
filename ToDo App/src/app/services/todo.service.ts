import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TODOS } from '../models/mock-todo';


@Injectable()
export class TodoService {

  getTodos(): Todo[] {
    return TODOS;
  }

  constructor() { }

}

