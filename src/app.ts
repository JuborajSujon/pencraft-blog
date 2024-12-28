// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/errors/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Home Page');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
