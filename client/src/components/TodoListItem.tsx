import React from "react";

import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const TodoListItem = (props: any) => (
  <ListItem divider={props.divider}>
    <Checkbox
      data-testid="update"
      onClick={props.onCheckBoxToggle}
      checked={props.done}
      disableRipple
    />
    <ListItemText primary={props.title} secondary={props.description} />
    <ListItemSecondaryAction>
      <IconButton
        data-testid="remove"
        aria-label="Delete Todo"
        onClick={props.onButtonClick}
      >
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default TodoListItem;
