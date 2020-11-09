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

export const add = async (_event, _context) => {};

export const update = async (_event, _context) => {};

export const remove = async (_event, _context) => {};
