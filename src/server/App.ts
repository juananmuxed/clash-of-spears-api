import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors'

import { useLoggerServer } from '../config/UseLoggerServer';
import { ApiPaths } from '../models/Server';
import { db, dbHost, dbTable } from '../db/Connection';
import { useSwagger } from '../middlewares/Swagger';
import { useDefaultErrorHandler, useErrorHandler } from '../middlewares/ErrorHandler';

import expansionsRoutes from '../routes/Expansions'
import armiesRoutes from '../routes/Armies'
import weaponsRoutes from '../routes/Weapons'
import unitTypesRoutes from '../routes/UnitTypes'
import usersRoutes from '../routes/Users'
import rolesRoutes from '../routes/Roles'
import authenticationRoutes from '../routes/Authentication'

const log = useLoggerServer();

export class Server {
  private app: Application;
  private port: string | number;
  private host: string;
  private rootPath = '/api/';
  private apiPaths: ApiPaths = {
    docs: this.rootPath + 'docs',
    expansions: this.rootPath + 'expansions',
    armies: this.rootPath + 'armies',
    weapons: this.rootPath + 'weapons',
    unitTypes: this.rootPath + 'unit-types',
    users: this.rootPath + 'users',
    roles: this.rootPath + 'roles',
    authentication: this.rootPath + 'auth',
  }

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
    this.app.use(this.apiPaths.expansions, expansionsRoutes);
    this.app.use(this.apiPaths.armies, armiesRoutes);
    this.app.use(this.apiPaths.unitTypes, unitTypesRoutes);
    this.app.use(this.apiPaths.weapons, weaponsRoutes);
    this.app.use(this.apiPaths.users, usersRoutes);
    this.app.use(this.apiPaths.roles, rolesRoutes);
    this.app.use(this.apiPaths.authentication, authenticationRoutes);
  }

  swagger() {
    this.app.use(this.apiPaths.docs, swaggerUI.serve, swaggerUI.setup(useSwagger(), {
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
