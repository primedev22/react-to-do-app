import { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, removeTodo } from "../api";
import { Todo } from "../types";

const useTodos = (initialValue: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(initialValue);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(console.error);
  }, []);

  return {
    todos,
    addTodo: (todo: Todo) => {
      addTodo(todo)
        .then((data) => {
          todos.push(data.item);
          setTodos([...todos]);
        })
        .catch(console.error);
    },
    updateTodo: (todo: Todo) => {
      updateTodo(todo)
        .then((data) => {
          const index = todos.findIndex((item) => item.id === data.item.id);
          todos[index] = data.item;
          setTodos([...todos]);
        })
        .catch(console.error);
    },
    removeTodo: ({ id }: Todo) => {
      removeTodo(id)
        .then((data) => {
          const index = todos.findIndex((item) => item.id === data.id);
          todos.splice(index, 1);
          setTodos([...todos]);
        })
        .catch(console.error);
    },
  };
};

export default useTodos;
