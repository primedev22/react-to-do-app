import React from "react";
import { useInputValue } from "../hooks";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const AddTodo = (props: any) => {
  const title = useInputValue();
  const description = useInputValue();

  const onAdd = () => {
    // Validation check
    if (title.inputValue.length === 0 || description.inputValue.length === 0) {
      props.showErrorMessage("The title or description must be non-empty.");
      return false;
    }

    props.onSubmit({
      title: title.inputValue,
      description: description.inputValue,
    });
    title.clearInput();
    description.clearInput();
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            inputProps={{
              "data-testid": "title",
            }}
            placeholder="Title here"
            value={title.inputValue}
            onChange={title.changeInput}
            fullWidth
          />
        </Grid>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            inputProps={{
              "data-testid": "description",
            }}
            multiline
            rows={5}
            placeholder="Description here"
            value={description.inputValue}
            onChange={description.changeInput}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item container alignItems="flex-end">
          <Button
            data-testid="button"
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onAdd}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
