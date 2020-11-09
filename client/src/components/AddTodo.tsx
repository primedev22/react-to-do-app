import React from "react";
import { useInputValue } from "../hooks";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const AddTodo = (props: any) => {
  const title = useInputValue();

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            inputProps={{
              "data-testid": "title"
            }}
            placeholder="Add Todo here"
            value={title.inputValue}
            onChange={title.changeInput}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            data-testid="button"
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={() => {
              props.onSubmit({
                title: title.inputValue
              });
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
