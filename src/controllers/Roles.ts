import { NextFunction, Request, Response } from "express";
import { RoleItem, Roles } from "../db/models/Roles";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";

export class RolesController {

  async getRoles(_req: Request, res: Response) {
    const roles = await Roles.findAll();
    
    res.json(roles)
  }

  async createRole(req: TypedRequest<RoleItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const newRole = await Roles.create(body);
        
      res.status(201).json(newRole)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  async updateRole(req: TypedRequest<RoleItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const role = await Roles.findByPk(body.id);

      if(!role) next(new NotFoundError(ERRORS.NOT_FOUND('Role')))
      
      const newRole = await role?.update(body)
        
      res.json(newRole)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
 
  async deleteRole(req: TypedRequest<RoleItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const role = await Roles.findByPk(body.id);

      if(!role) next(new NotFoundError(ERRORS.NOT_FOUND('Role')))
      
      const newRole = await role?.destroy()
        
      res.json(newRole)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}