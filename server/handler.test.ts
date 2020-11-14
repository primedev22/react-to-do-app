import { todos, add, update, remove } from "./handler";

const UUID = "abc-def-ghi";

const mocks = {
  dynamodb: {
    scan: jest.fn(),
    putItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn()
  }
};

jest.mock("aws-sdk", () => ({
  DynamoDB: function() {
    return {
      scan: params => ({ promise: () => mocks.dynamodb.scan(params) }),
      putItem: params => ({ promise: () => mocks.dynamodb.putItem(params) }),
      updateItem: params => ({
        promise: () => mocks.dynamodb.updateItem(params)
      }),
      deleteItem: params => ({
        promise: () => mocks.dynamodb.deleteItem(params)
      })
    };
  }
}));

jest.mock("uuid", () => ({ default: () => UUID }));

describe("todo handler", () => {
  it("should fetch all todos", async () => {
    mocks.dynamodb.scan.mockReset();

    mocks.dynamodb.scan.mockResolvedValueOnce({
      Items: [
        {
          id: { S: UUID },
          createdAt: { S: "2020-01-01" },
          title: { S: "Test 1" },
          description: { S: "Description" },
          done: { BOOL: false }
        },
        {
          id: { S: UUID },
          createdAt: { S: "2020-01-01" },
          title: { S: "Test 2" },
          description: { S: "Description" },
          done: { BOOL: false }
        }
      ]
    });

    // @ts-ignore
    const response = await todos();

    expect(mocks.dynamodb.scan).toBeCalledWith(
      expect.objectContaining({
        TableName: "todosTable"
      })
    );
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual([
      {
        id: UUID,
        createdAt: "2020-01-01",
        title: "Test 1",
        description: "Description",
        done: false
      },
      {
        id: UUID,
        createdAt: "2020-01-01",
        title: "Test 2",
        description: "Description",
        done: false
      }
    ]);
  });

  it("should return 400", async () => {
    mocks.dynamodb.scan.mockReset();

    mocks.dynamodb.scan.mockRejectedValueOnce({
      message: "Test error"
    });

    // @ts-ignore
    const response = await todos();

    expect(mocks.dynamodb.scan).toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: "Test error"
    });
  });
});

describe("add handler", () => {
  it("should add a todo", async () => {
    mocks.dynamodb.putItem.mockReset();
    mocks.dynamodb.putItem.mockResolvedValueOnce(true);

    const body = {
      title: "Test",
      description: "Todo description"
    };

    // @ts-ignore
    const response = await add({
      body: JSON.stringify(body)
    });

    expect(mocks.dynamodb.putItem).toBeCalledWith(
      expect.objectContaining({
        TableName: "todosTable",
        Item: {
          id: {
            S: UUID
          },
          title: {
            S: body.title
          },
          description: {
            S: body.description
          },
          createdAt: {
            S: expect.any(String)
          },
          done: {
            BOOL: false
          }
        }
      })
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      success: true,
      item: {
        id: UUID,
        title: body.title,
        description: body.description,
        createdAt: expect.any(String),
        done: false
      }
    });
  });

  it("should return 400", async () => {
    mocks.dynamodb.putItem.mockReset();
    mocks.dynamodb.putItem.mockRejectedValueOnce({
      message: "Test error"
    });

    const body = {
      title: "Test",
      description: "Todo description"
    };

    // @ts-ignore
    const response = await add({
      body: JSON.stringify(body)
    });
    expect(mocks.dynamodb.scan).toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: "Test error"
    });
  });

  it("should return 422", async () => {
    const body = {
      description: "Todo description"
    };

    // @ts-ignore
    const response = await add({
      body: JSON.stringify(body)
    });
    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body)).toEqual({
      message: "\"title\" is required"
    });
  });
});

describe("update handler", () => {
  it("should update a todo", async () => {
    const todo = {
      id: UUID,
      title: "Test",
      description: "Description",
      createdAt: "2020-01-01"
    };

    mocks.dynamodb.updateItem.mockReset();
    mocks.dynamodb.updateItem.mockResolvedValueOnce({
      Attributes: {
        id: { S: todo.id },
        title: { S: todo.title },
        description: { S: todo.description },
        createdAt: { S: todo.createdAt },
        done: { BOOL: true }
      }
    });

    // @ts-ignore
    const response = await update({
      body: JSON.stringify({ id: todo.id, done: true })
    });

    expect(mocks.dynamodb.updateItem).toBeCalledWith(
      expect.objectContaining({
        TableName: "todosTable",
        Key: {
          id: {
            S: todo.id
          }
        },
        UpdateExpression: "SET #done = :done",
        ExpressionAttributeNames: {
          "#done": "done"
        },
        ExpressionAttributeValues: {
          ":done": { BOOL: true }
        }
      })
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      success: true,
      item: { ...todo, done: true }
    });
  });

  it("should return 400", async () => {
    mocks.dynamodb.updateItem.mockReset();
    mocks.dynamodb.updateItem.mockRejectedValueOnce({
      message: "Test error"
    });

    // @ts-ignore
    const response = await update({
      body: JSON.stringify({ id: UUID, done: true })
    });
    expect(mocks.dynamodb.scan).toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: "Test error"
    });
  });

  it("should return 422", async () => {
    const body = {
      id: UUID
    };

    // @ts-ignore
    const response = await update({
      body: JSON.stringify(body)
    });
    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body)).toEqual({
      message: "\"done\" is required"
    });
  });
});

describe("remove handler", () => {
  it("should update a todo", async () => {
    const id = UUID;

    mocks.dynamodb.deleteItem.mockReset();
    mocks.dynamodb.deleteItem.mockResolvedValueOnce(true);

    // @ts-ignore
    const response = await remove({
      body: JSON.stringify({ id })
    });

    expect(mocks.dynamodb.deleteItem).toBeCalledWith(
      expect.objectContaining({
        TableName: "todosTable",
        Key: {
          id: {
            S: id
          }
        }
      })
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      success: true,
      id
    });
  });

  it("should return 400", async () => {
    const id = UUID;

    mocks.dynamodb.deleteItem.mockReset();
    mocks.dynamodb.deleteItem.mockRejectedValueOnce({
      message: "Test error"
    });

    // @ts-ignore
    const response = await remove({
      body: JSON.stringify({ id })
    });

    expect(mocks.dynamodb.scan).toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: "Test error"
    });
  });

  it("should return 422", async () => {
    const body = {};

    // @ts-ignore
    const response = await remove({
      body: JSON.stringify(body)
    });
    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body)).toEqual({
      message: "\"id\" is required"
    });
  });
});
