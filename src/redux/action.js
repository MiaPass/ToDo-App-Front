import axios from "axios";

import swal from "sweetalert";

import { GET_ALL, MODIFY, CREATE, DELETE, GET_ONE, THEME } from "../constants";

/*-------------- GET --------------*/

export function getAll() {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/todos/all`
        // `https://prueba-todo-back.herokuapp.com/api/todos/all`
      );
      dispatch({ type: GET_ALL, payload: res.data });
    } catch (err) {
      console.log(err);
      swal({
        title: "Ups!",
        text: "Parece que hubo un error",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      }).then(() => {
        window.location.reload();
      });
    }
  };
}

/*-------------- MODIFY --------------*/

export function modify(form) {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/todos/modify`,
        // `https://prueba-todo-back.herokuapp.com/api/todos/modify`,
        form
      );
      dispatch({ type: MODIFY, payload: res.data });
    } catch (err) {
      console.log(err);
      swal({
        title: "Ups!",
        text: "Parece que hubo un error",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      }).then(() => {
        window.location.reload();
      });
    }
  };
}

/*-------------- CREATE --------------*/

export function createTodo(form) {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/todos/create`,
        // `https://prueba-todo-back.herokuapp.com/api/todos/create`,
        form
      );
      dispatch({ type: CREATE, payload: res.data });
    } catch (err) {
      console.log(err);
      swal({
        title: "Ups!",
        text: "Parece que hubo un error",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      }).then(() => {
        window.location.reload();
      });
    }
  };
}

/*-------------- DELETE --------------*/

export function deleteTodo(id) {
  return async function (dispatch) {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/todos/delete?id=${id}`
        // `https://prueba-todo-back.herokuapp.com/api/todos/delete?id=${id}`
      );
      dispatch({ type: DELETE, payload: res.data });
    } catch (err) {
      console.log(err);
      swal({
        title: "Ups!",
        text: "Parece que hubo un error",
        icon: "error",
        button: "Aceptar",
        timer: "10000",
      }).then(() => {
        window.location.reload();
      });
    }
  };
}

export function getOne(payload) {
  return function (dispatch) {
    dispatch({ type: GET_ONE, payload: payload });
  };
}

/*-------------- THEME --------------*/

export function changeTheme(payload) {
  return function (dispatch) {
    dispatch({ type: THEME, payload: payload });
  };
}
