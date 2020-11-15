import "./App.css";
import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useErrorMessage, useTodos } from "./hooks";

import Layout from "./components/Layout";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const { message, setMessage, clearMessage } = useErrorMessage();
  const { todos, addTodo, updateTodo, removeTodo } = useTodos([], setMessage);

  return (
    <Layout>
      <ErrorMessage message={message} onClose={clearMessage} />
      {todos ? (
        <>
          <AddTodo onSubmit={addTodo} showErrorMessage={setMessage} />
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
