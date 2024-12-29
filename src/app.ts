// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/errors/notFound';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Page');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
