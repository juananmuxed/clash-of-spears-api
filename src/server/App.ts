import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors'

import { useLoggerServer } from '../config/UseLoggerServer';
import { db, dbHost, dbTable } from '../db/Connection';
import { useSwagger } from '../middlewares/Swagger';
import { useDefaultErrorHandler, useErrorHandler } from '../middlewares/ErrorHandler';
import { apiPaths, setRoutes } from '../routes/Main';

const log = useLoggerServer();

export class Server {
  private app: Application;
  private port: string | number;
  private host: string;

  constructor() {
    this.app = express()
    this.port = process.env.API_PORT || 3000
    this.host = process.env.API_HOST || 'localhost';

    this.dbConnection();
    this.middleWares();
    this.routes();
    this.swagger();
    this.errorHandler();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      log.dbConnected('Host:' + dbHost + ' / Table:' + dbTable)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  middleWares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    setRoutes(this.app);
  }

  swagger() {
    this.app.use(apiPaths.docs, swaggerUI.serve, swaggerUI.setup(useSwagger(), {
      swaggerOptions: {
        docExpansion: 'none'
      }
    }));
  }

  errorHandler() {
    this.app.use(useDefaultErrorHandler)
    this.app.use(useErrorHandler)
  }

  listen() {
    this.app.listen(this.port, () => {
      log.serverStart({port: this.port, host: this.host})
    })
  }
}
