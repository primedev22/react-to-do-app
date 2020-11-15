import { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, removeTodo } from "../api";
import { Todo } from "../types";

const useTodos = (initialValue: Todo[], setMessage: Function) => {
  const [todos, setTodos] = useState<Todo[]>(initialValue);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        setMessage(error.message || "Server error");
      });
  }, []);

  return {
    todos,
    addTodo: (todo: Todo) => {
      addTodo(todo)
        .then((data) => {
          const result = [...todos];
          result.push(data.item);
          setTodos(result);
        })
        .catch((error) => {
          setMessage(error.message || "Server error");
        });
    },
    updateTodo: (todo: Todo) => {
      updateTodo(todo)
        .then((data) => {
          const result = [...todos];
          const index = todos.findIndex((item) => item.id === data.item.id);
          result[index] = data.item;
          setTodos(result);
        })
        .catch((error) => {
          setMessage(error.message || "Server error");
        });
    },
    removeTodo: ({ id }: Todo) => {
      removeTodo(id)
        .then((data) => {
          const result = [...todos];
          const index = todos.findIndex((item) => item.id === data.id);
          result.splice(index, 1);
          setTodos(result);
        })
        .catch((error) => {
          setMessage(error.message || "Server error");
        });
    },
  };
};

export default useTodos;
