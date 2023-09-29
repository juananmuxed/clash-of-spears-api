import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors'

import { useLoggerServer } from '../config/UseLoggerServer';
import { ApiPaths } from '../models/Server';
import expansionRoutes from '../routes/Expansions'
import { db, dbHost, dbTable } from '../db/Connection';
import { useSwagger } from './Swagger';

const log = useLoggerServer();

export class Server {
  private app: Application;
  private port: string | number;
  private host: string;
  private rootPath = '/api/';
  private apiPaths: ApiPaths = {
    expansions: this.rootPath + 'expansions'
  }

  constructor() {
    this.app = express()
    this.port = process.env.API_PORT || 3000
    this.host = process.env.API_HOST || 'localhost';

    this.dbConnection();
    this.middlewares();
    this.routes();
    this.swagger();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      log.dbConnected('Host:' + dbHost + ' / Table:' + dbTable)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  swagger() {
    this.app.use('/', swaggerUI.serve, swaggerUI.setup(useSwagger()));
  }

  routes() {
    this.app.use(this.apiPaths.expansions, expansionRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      log.serverStart({port: this.port, host: this.host})
    })
  }
}