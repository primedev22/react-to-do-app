import { Todo } from "../types";

export const getTodos = async (): Promise<Todo[]> => {
  return await (await fetch("http://localhost:4000/todos")).json();
};

export const addTodo = async ({
  title,
  description,
}: Todo): Promise<{ success: boolean; item: Todo }> => {
  // @ts-ignore
  const response = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  // Validation error
  if (response.status === 422) {
    throw await response.json();
  }
  return await response.json();
};

export const updateTodo = async ({
  id,
  done,
}: Todo): Promise<{ success: boolean; item: Todo }> => {
  // @ts-ignore
  const response = await fetch("http://localhost:4000/todos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, done }),
  });
  return await response.json();
};

export const removeTodo = async (
  id: string
): Promise<{ success: boolean; id: string }> => {
  // @ts-ignore
  const response = await fetch("http://localhost:4000/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
};
