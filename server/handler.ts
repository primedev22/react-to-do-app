import { DynamoDB } from "aws-sdk";
// @ts-ignore
import uuid from "uuid";

const dynamodb = new DynamoDB({
  region: "localhost",
  sslEnabled: false,
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET"
});

export const todos = async (_event, _context) => {
  try {
    var params = {
      TableName: "todosTable"
    };
    const data = await dynamodb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        data.Items.map(
          ({
            id: { S: id },
            createdAt: { S: createdAt },
            title: { S: title },
            description: { S: description },
            done: { BOOL: done }
          }) => ({
            id,
            createdAt,
            title,
            description,
            done
          })
        ),
        null,
        2
      )
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2)
    };
  }
};

export const add = async (_event, _context) => {
  const data = JSON.parse(_event.body);
  const params = {
    TableName: "todosTable",
    Item: {
      id: { S: uuid() },
      title: { S: data.title },
      description: { S: data.description },
      done: { BOOL: false },
      createdAt: { S: new Date().toISOString() },
    },
  };
  try {
    await dynamodb.putItem(params).promise();

    const {
      id: { S: id },
      title: { S: title },
      description: { S: description },
      done: { BOOL: done },
      createdAt: { S: createdAt },
    } = params.Item;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        item: { id, title, description, done, createdAt },
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};

export const update = async (_event, _context) => {
  const data = JSON.parse(_event.body);
  const params = {
    TableName: "todosTable",
    Key: {
      id: { S: data.id },
    },
    ExpressionAttributeNames: {
      "#done": "done",
    },
    ExpressionAttributeValues: {
      ":done": { BOOL: data.done },
    },
    UpdateExpression: "SET #done = :done",
    ReturnValues: "ALL_NEW",
  };
  try {
    const data = await dynamodb.updateItem(params).promise();

    const {
      id: { S: id },
      title: { S: title },
      description: { S: description },
      done: { BOOL: done },
      createdAt: { S: createdAt },
    } = data.Attributes;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        item: { id, title, description, done, createdAt },
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};

export const remove = async (_event, _context) => {
  const data = JSON.parse(_event.body);
  var params = {
    TableName: "todosTable",
    Key: {
      id: { S: data.id },
    },
  };
  try {
    await dynamodb.deleteItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        id: data.id,
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};
