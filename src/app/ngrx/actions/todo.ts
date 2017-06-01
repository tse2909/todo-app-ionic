import {Action} from '@ngrx/store';
import {REQUEST_TODO, REQUEST_TODO_SUCCESS, ADD_TODO, ADD_TODO_SUCCESS, REMOVE_TODO, REMOVE_TODO_SUCCESS, UPDATE_TODO, UPDATE_TODO_SUCCESS} from '../reducers/todo';

export const addTodo = (todo) => {
    return <Action>{ type: ADD_TODO, payload: todo };
}

export const addTodoSuccess = (todo) => {
    return <Action>{ type: ADD_TODO_SUCCESS, payload: todo };
}

export const updateTodo = (todo) => {
    return <Action>{ type: UPDATE_TODO, payload: todo };
}

export const updateTodoSuccess = (todo) => {
    return <Action>{ type: UPDATE_TODO_SUCCESS, payload: todo };
}

export const removeTodo = (todo) => {
    return <Action>{ type: REMOVE_TODO, payload: todo };
}

export const removeTodoSuccess = (todo) => {
    return <Action>{ type: REMOVE_TODO_SUCCESS, payload: todo };
}

export const requestTodo = () => {
    return <Action>{ type: REQUEST_TODO };
}

export const requestTodoSuccess = (todo) => {
    return <Action>{ type: REQUEST_TODO_SUCCESS, payload: todo };
}