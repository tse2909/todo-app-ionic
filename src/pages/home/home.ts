import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Subject } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { requestTodo, addTodo, updateTodo, removeTodo } from '../../app/ngrx/actions/todo';
import { getTodos } from '../../app/ngrx/reducers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Observable<any[]>;
  actions$ = new Subject<Action>();
  constructor(public navCtrl: NavController, public store: Store<any>, public loadingCtrl: LoadingController) {
    this.actions$.subscribe(store);
    this.actions$.next(requestTodo());
    this.todos = this.store.let(getTodos());
  }

  addTodo($event) {
    console.log($event);
    let todoData = {
      title: $event,
      finish: false
    }
    this.actions$.next(addTodo(todoData));
    this.todos = this.store.let(getTodos());
  }

  toggleTodoComplete($event) {
    let loading = this.loadingCtrl.create({
      content: 'Updating todo ...'
    });
    loading.present();
    let todoData = {
      id: $event._id,
      finish: !$event.finish
    }
    this.actions$.next(updateTodo(todoData));
    this.todos = this.store.let(getTodos());
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
    
  }

  removeTodo($event) {
    let loading = this.loadingCtrl.create({
      content: 'Removing todo ...'
    });
    loading.present();

    let todoData = {
      id: $event._id,
    }
    this.actions$.next(removeTodo(todoData));
    this.todos = this.store.let(getTodos());

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
    
  }
}
