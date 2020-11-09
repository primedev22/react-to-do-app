import { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, removeTodo } from "../api";
import { Todo } from "../types";

const useTodos = (initialValue?: Todo[]) => {
  const [todos, setTodos] = useState<Todo[] | undefined>(initialValue);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(console.error);
  }, []);

  return {
    todos,
    addTodo: (todo: Todo) => {},
    updateTodo: (todo: Todo) => {},
    removeTodo: ({ id }: Todo) => {}
  };
};

export default useTodos;
