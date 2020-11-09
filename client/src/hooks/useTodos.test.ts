import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import useTodos from "./useTodos";

describe("useTodos", () => {
  it("should fetch todos", async () => {
    const todos = [
      {
        id: { S: "abc" },
        createdAt: { S: "2020-01-01" },
        title: { S: "Test 1" },
        description: { S: "Description" },
        done: { BOOL: false }
      },
      {
        id: { S: "def" },
        createdAt: { S: "2020-01-01" },
        title: { S: "Test 2" },
        description: { S: "Description" },
        done: { BOOL: false }
      }
    ];

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(todos)
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useTodos());

    await waitForNextUpdate();

    expect(result.current.todos).toEqual(todos);
  });

  it("should add todo", async () => {
    const todos = [
      {
        id: "abc",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    const todo = {
      id: "ghi",
      title: "Test 3",
      description: "Description",
      done: false
    };

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(todos)
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useTodos());

    await waitForNextUpdate();

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            item: todo
          })
      })
    );

    await act(async () => {
      result.current.addTodo(todo);
    });

    expect(result.current.todos).toEqual(todos.concat(todo));
  });

  it("should update todo", async () => {
    const todos = [
      {
        id: "abc",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(todos)
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useTodos());

    await waitForNextUpdate();

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            item: { ...todos[0], done: true }
          })
      })
    );

    await act(async () => {
      result.current.updateTodo({ ...todos[0], done: true });
    });

    expect(result.current.todos[0].done).toBe(true);
  });

  it("should remove todo", async () => {
    const todos = [
      {
        id: "abc",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: "def",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ];

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(todos)
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useTodos());

    await waitForNextUpdate();

    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            id: todos[0].id
          })
      })
    );

    await act(async () => {
      result.current.removeTodo(todos[0]);
    });

    expect(result.current.todos).toEqual([todos[1]]);
  });
});
