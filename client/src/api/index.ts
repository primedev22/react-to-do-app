import { Todo } from "../types";

export const getTodos = async (): Promise<Todo[]> => {
  return await (await fetch("http://localhost:4000/todos")).json();
};

export const addTodo = async (
  todo: Todo
): Promise<{ success: boolean; item: Todo }> => {
  // @ts-ignore
  return;
};

export const updateTodo = async (
  todo: Todo
): Promise<{ success: boolean; item: Todo }> => {
  // @ts-ignore
  return;
};

export const removeTodo = async (
  id: string
): Promise<{ success: boolean; id: string }> => {
  // @ts-ignore
  return;
};
