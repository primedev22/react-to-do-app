# Coding test

Welcome! The goal of this test is to complete the tasks outlined below while following the existing code base structure. Please read all the directions before you begin.

## Description

This code contains a basic Todo app consisting of 2 parts, client and server. The client part is built using React and the server with AWS Lambdas.

The test is designed to run locally and with no need of an internet connection.

The test should take no longer than 4 hours. We understand that you may have a job and other responsibilities, so we allow 3 days to complete the challenge. The test begins as soon as you are granted access to this repository. If you need an extra day or two because of extenuating circumstances, please let us know as soon as you are able.

We hope you enjoy the process :)


## System Requirements

- NPM and Node.js
- Serverless framework https://serverless.com/framework/docs/providers/aws/guide/installation/
- Java Developer Kit (JDK) https://www.oracle.com/java/technologies/javase-jdk13-downloads.html

## Tasks

Please complete the following:

- Implement **POST**, **PUT** and **DELETE** methods of the `/todos` end-point for adding, updating and removing ToDos respectively to DynamoDB. For the purpose of this test, please don’t use `DynamoDB.DocumentClient` for these operations.
- Validate the body for post, put and delete methods. On error, return the appropriate status code and a readable message
- Write tests for the post, put and delete body validation.
- Implement `description` field on `AddTodo` component.
- Complete the API implementation for create, update and remove todos on the client. 
- Create a global error display component that is dismissible and can display a message property.
- Implement field validation on the AddTodo component. If either the title or description are empty, use the global error component to display the error.
- Use the global error display component to display errors from the **POST**, **PUT**, and **DELETE** endpoints if necessary.
- Write a test for the field validation on the AddTodo component.
- When a new Todo is added, the inputs for title and description should be cleared.

## Setup

- In both /client and /server, run `npm install` to install all dependencies and `npm start` to start the service
- Run `npm test` to run the test suite
- Please ignore this warning `Serverless: WARNING: More than one matching handlers found for 'handler'. Using 'handler.ts'.`

_Make sure ports 3000, 4000 and 8000 are free before starting the services_

## Guidance

- Document issues as if you were describing them to other developers.
- Don’t get too fancy! We will consider it a win if you keep the codebase very similar, while completing the tasks above.
- Please follow the existing code base structure.
- Make commits and PRs as if you were working on a real team - keep commits small and focused, keep PRs related to specific tasks.
- Testing is very important to us, so please show us that it’s important to you as well :)
- Make sure all tests pass
- **DO NOT** change existing tests


**Good luck!**
