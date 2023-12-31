
import expansionsRoutes from './Expansions'
import armiesRoutes from './Armies'
import weaponsRoutes from './Weapons'
import armorsRoutes from './Armors'
import traitsRoutes from './Traits'
import traitsValuesRoutes from './TraitsValues'
import optionsRoutes from './Options'
import unitsRoutes from './Units'
import usersRoutes from './Users'
import rolesRoutes from './Roles'
import authenticationRoutes from './Authentication'
import { Application } from 'express'

const Paths = [
  "docs",
  "expansions",
  "armies",
  "weapons",
  "armors",
  "options",
  "traits",
  "traitsValues",
  "units",
  "users",
  "roles",
  "authentication",
] as const;

type ApiPaths = typeof Paths[number];

const rootPath = '/api/';
export const apiPaths: Record<ApiPaths, string> = {
  docs: rootPath + 'docs',
  expansions: rootPath + 'expansions',
  armies: rootPath + 'armies',
  weapons: rootPath + 'weapons',
  armors: rootPath + 'armors',
  traits: rootPath + 'traits',
  traitsValues: rootPath + 'traits-values',
  options: rootPath + 'options',
  units: rootPath + 'units',
  users: rootPath + 'users',
  roles: rootPath + 'roles',
  authentication: rootPath + 'auth',
}

export const setRoutes = (app: Application) => {
  app.use(apiPaths.expansions, expansionsRoutes);
  app.use(apiPaths.armies, armiesRoutes);
  app.use(apiPaths.weapons, weaponsRoutes);
  app.use(apiPaths.armors, armorsRoutes);
  app.use(apiPaths.traits, traitsRoutes);
  app.use(apiPaths.traitsValues, traitsValuesRoutes);
  app.use(apiPaths.options, optionsRoutes);
  app.use(apiPaths.units, unitsRoutes);
  app.use(apiPaths.users, usersRoutes);
  app.use(apiPaths.roles, rolesRoutes);
  app.use(apiPaths.authentication, authenticationRoutes);
}
