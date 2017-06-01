import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/combineLatest'

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import * as fromTodo from './todo';

import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
    todo: fromTodo.TodoState
}

const reducers = {
    todo: fromTodo.todoReducer,

};

const developmentReducer: ActionReducer<AppState> = compose(
    storeFreeze,
    localStorageSync({ keys: ['todo'], rehydrate: true }),
    combineReducers)(reducers);

const productionReducer: ActionReducer<AppState> = compose(
    localStorageSync({ keys: ['todo'], rehydrate: true }),
    combineReducers)(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}

export function getTodoState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.todo);
}

export function getTodos() {
    return (state$: Observable<AppState>) => {
        return state$.let(getTodoState())
            .map((todo: any) => {
                return todo.todos
            })
    }
}

