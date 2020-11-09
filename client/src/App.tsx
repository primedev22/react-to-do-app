import "./App.css";
import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useTodos } from "./hooks";

import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const { todos, addTodo, updateTodo, removeTodo } = useTodos();

  return (
    <Layout>
      {todos ? (
        <>
          <AddTodo onSubmit={addTodo} />
          <TodoList
            items={todos}
            onItemUpdate={updateTodo}
            onItemRemove={removeTodo}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </Layout>
  );
};

export default App;
