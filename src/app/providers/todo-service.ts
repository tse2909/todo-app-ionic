import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
/*
  Generated class for the ImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('X-Requested-With', 'XMLHttpRequest');

@Injectable()
export class TodoService {
  rooturl = "https://todo-list-app-api.herokuapp.com";
  constructor(public http: Http) {
    this.http = http;
  }

  getTodo() {
    return this.http.get(this.rooturl + "/getTodos", )
      .do((res: Response) => console.log(res))
      .map((res: Response) => res.json())
  }

  postTodo(todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.rooturl + "/postTodo", todo, { headers: contentHeaders })
      .map((res: Response) => res.json())
  }

  updateTodo(todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.rooturl + "/updateTodo", todo, { headers: contentHeaders })
      .map((res: Response) => res.json())
  }

  deleteTodo(todo) {
    console.log(todo.id);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.rooturl + "/deleteTodo/" + todo.id, { headers: contentHeaders })
      .map((res: Response) => res.json())
  }
}
