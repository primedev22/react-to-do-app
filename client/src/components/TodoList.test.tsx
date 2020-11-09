import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("should render correctly", async () => {
    const items = [
      {
        id: "abc",
        createdAt: "2020-01-01",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        createdAt: "2020-01-01",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    const { getByTestId } = render(<TodoList items={items} />);
    const todos = getByTestId("todos");
    expect(todos.children.length).toBe(2);
  });

  it("should update todo", async () => {
    let items = [
      {
        id: "abc",
        createdAt: "2020-01-01",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        createdAt: "2020-01-01",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    const onItemUpdate = jest.fn(todo => {
      items = items.map(item => (item.id !== todo.id ? item : todo));
    });

    const { findAllByTestId } = render(
      <TodoList items={items} onItemUpdate={onItemUpdate} />
    );

    const update = await findAllByTestId("update");

    fireEvent.click(update[0]);

    expect(items[0].done).toBe(true);
  });

  it("should remove todo", async () => {
    let items = [
      {
        id: "abc",
        createdAt: "2020-01-01",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        createdAt: "2020-01-01",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    const onItemRemove = jest.fn(todo => {
      items = items.filter(item => item.id !== todo.id);
    });

    const { findAllByTestId } = render(
      <TodoList items={items} onItemRemove={onItemRemove} />
    );

    const remove = await findAllByTestId("remove");

    fireEvent.click(remove[0]);

    expect(items.length).toBe(1);
  });
});
