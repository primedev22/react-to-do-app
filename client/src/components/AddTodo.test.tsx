import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  it("should render correctly", async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = render(<AddTodo onSubmit={onSubmit} />);

    const title = await findByTestId("title");
    const description = await findByTestId("description");
    const button = await findByTestId("button");

    fireEvent.change(title, { target: { value: "New Todo" } });
    fireEvent.change(description, { target: { value: "Todo description" } });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith({
      title: "New Todo",
      description: "Todo description"
    });
  });
});
