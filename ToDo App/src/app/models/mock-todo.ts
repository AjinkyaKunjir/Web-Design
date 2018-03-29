import { Todo } from "./todo";

export const TODOS: Todo[] = [
    {
      id: 1,
      authorname: "Ajinkya",
      title:"Daily Routines",
      description: "Laundry",
      updated: new Date('2018-06-02'),
      done: true
    },
    {
      id: 2,
      authorname: "Ajinkya",
      title: "Grocery",
      description: "Buy fuits",
      updated: new Date('2018-05-03'),
      done: false
    },
    {
      id: 3,
      authorname: "Ajinkya",
      title: "Cooking",
      description: "Bake cake",
      updated: new Date(),
      done: true
    }
  ];
