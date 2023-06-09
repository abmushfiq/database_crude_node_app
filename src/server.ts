import * as express from "express";
import { json } from "body-parser";

import { deleteDynamoDbItem, getDynamoDbItem, putDynamoDbItem, updateDynamoDbItem } from "./dynamodb-item";
import { deletePostgresItem, getPostgresDbItem, createPostgresDbItem, updatePostgresItem  } from "./postgresdb-item";
import { deleteItem, getItem, putItem, updateItem, listItems } from "./local-item";
import { createMysqlItem, deleteMysqlItem, getMysqlItem, updateMysqlItem } from "./mysql-item";


// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App handlers
const app = express();
const parser = json();

app.get("/", (req:any, res:any) => {
  res.status(200).send("hello world!");
});

app.get("/ping", (req:any, res:any) => {
  res.status(200).send("pong");
});

app.get("/healthy", (req:any, res:any) => {
  res.status(200).send("healthy");
});

app.get("/env-var", (req:any, res:any) => {
  res.status(200).send(process.env.TEST_ENV_VAR);
});


app.get('/local-item/:id', parser, getItem);
app.get('/local-item', parser, listItems);
app.post('/local-item', parser, putItem);
app.put('/local-item/:id', parser, updateItem);
app.delete('/local-item', parser, deleteItem);

app.put('/dynamodb-item', parser, putDynamoDbItem);
app.post('/dynamodb-item', parser, updateDynamoDbItem);
app.get('/dynamodb-item', parser, getDynamoDbItem);
app.delete('/dynamodb-item', parser, deleteDynamoDbItem);

app.get('/postgres-item/:id', parser, getPostgresDbItem);
app.get('/postgres-item', parser, getPostgresDbItem);
app.post('/postgres-item', parser, createPostgresDbItem);
app.put('/postgres-item/:id', parser, updatePostgresItem);
app.delete('/postgres-item/:id', parser, deletePostgresItem);

app.get('/mysql-item/:id', parser, getMysqlItem);
app.get('/mysql-item', parser, getMysqlItem);
app.post('/mysql-item', parser, createMysqlItem);
app.put('/mysql-item/:id', parser, updateMysqlItem);
app.delete('/mysql-item/:id', parser, deleteMysqlItem);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
