import React from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = (props: any) => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }} data-testid="todos">
          {props.items.map((todo: any, idx: number) => (
            <TodoListItem
              {...todo}
              key={todo.id}
              divider={idx !== props.items.length - 1}
              onButtonClick={props.onItemRemove}
              onCheckBoxToggle={props.onItemUpdate}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
);

export default TodoList;
