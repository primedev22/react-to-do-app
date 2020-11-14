import { DynamoDB } from "aws-sdk";
// @ts-ignore
import uuid from "uuid";
import * as Joi from 'joi';

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

  // validate request body
  const schema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
  });
  const { error, value } = schema.validate(data);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : 'Invalid request';
    return {
      statusCode: 422,
      body: JSON.stringify({ message }),
    };
  }

  // add new todo
  const params = {
    TableName: "todosTable",
    Item: {
      id: { S: uuid() },
      title: { S: value.title },
      description: { S: value.description },
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

  // validate request body
  const schema = Joi.object({
    id : Joi.string().required(),
    done : Joi.boolean().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : 'Invalid request';
    return {
      statusCode: 422,
      body: JSON.stringify({ message }),
    };
  }

  // update todo
  const params = {
    TableName: "todosTable",
    Key: {
      id: { S: value.id },
    },
    ExpressionAttributeNames: {
      "#done": "done",
    },
    ExpressionAttributeValues: {
      ":done": { BOOL: value.done },
    },
    UpdateExpression: "SET #done = :done",
    ReturnValues: "ALL_NEW",
  };
  try {
    const { Attributes } = await dynamodb.updateItem(params).promise();

    const {
      id: { S: id },
      title: { S: title },
      description: { S: description },
      done: { BOOL: done },
      createdAt: { S: createdAt },
    } = Attributes;

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

  // validate request body
  const schema = Joi.object({
    id : Joi.string().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) {
    const message = error.details.length > 0 ? error.details[0].message : 'Invalid request';
    return {
      statusCode: 422,
      body: JSON.stringify({ message }),
    };
  }

  // remove todo
  var params = {
    TableName: "todosTable",
    Key: {
      id: { S: value.id },
    },
  };
  try {
    await dynamodb.deleteItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        id: value.id,
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message }, null, 2),
    };
  }
};
