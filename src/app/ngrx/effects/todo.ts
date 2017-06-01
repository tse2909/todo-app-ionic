import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../../providers/todo-service';
import {ADD_TODO, ADD_TODO_SUCCESS, UPDATE_TODO, UPDATE_TODO_SUCCESS, REMOVE_TODO, REMOVE_TODO_SUCCESS, REQUEST_TODO, REQUEST_TODO_SUCCESS} from '../reducers/todo';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private api: TodoService
    ) { }

    @Effect()
    createTodo$ = this.actions$
        .ofType(ADD_TODO)
        .switchMap(({payload}) => this.api.postTodo(payload)
            .map(res => {
                return {
                    type: ADD_TODO_SUCCESS,
                    payload: res
                };
            })
        );

    @Effect()
    deleteTodo$ = this.actions$
        .ofType(REMOVE_TODO)
        .switchMap(({payload}) => this.api.deleteTodo(payload)
            .map(res => {
                return {
                    type: REMOVE_TODO_SUCCESS,
                    payload: res
                }
            })

        );

    @Effect()
    fetchTodo$ = this.actions$
        .ofType(REQUEST_TODO)
        .switchMap(() => this.api.getTodo()
            .map(res => {
                return {
                    type: REQUEST_TODO_SUCCESS,
                    payload: res
                }
            })
        );

    @Effect()
    updateTask$ = this.actions$
        .ofType(UPDATE_TODO)
        .switchMap(({payload}) => this.api.updateTodo(payload)
            .map(res => {
                return {
                    type: UPDATE_TODO_SUCCESS,
                    payload: res
                }
            })
        );
}  