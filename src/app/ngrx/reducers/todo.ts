import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Todo } from '../../common/interfaces';

export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';

export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';

export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';

export const REQUEST_TODO = 'REQUEST_TODO';
export const REQUEST_TODO_SUCCESS = 'REQUEST_TODO_SUCCESS';

export interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: []
}

export function todoReducer(state = initialState, action: Action): TodoState {
    switch (action.type) {
        case ADD_TODO_SUCCESS:
            return Object.assign({},
                state,
                {
                    todos: [...state.todos, action.payload]
                })

        case REMOVE_TODO_SUCCESS:
            return Object.assign({},
                state,
                {
                    todos: state.todos.filter(todo => todo._id !== action.payload._id)
                })

        case REQUEST_TODO_SUCCESS:
            return Object.assign({},
                state,
                {
                    todos: action.payload || []
                })

        case UPDATE_TODO_SUCCESS:
            return Object.assign({},
                state,
                {
                    todos: state.todos.map((todo) => {
                        return todo._id == action.payload._id ? action.payload : todo;
                    })
                })
        default:
            return state;
    }
};



