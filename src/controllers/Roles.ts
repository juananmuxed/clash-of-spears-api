import { NextFunction, Request, Response } from "express";
import { RoleItem, Roles } from "../db/models/Roles";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

export class RolesController {

  getRoles = async (_req: Request, res: Response) => {
    const roles = await Roles.findAll();

    res.json(roles)
  }

  getRolesPaginated = async (req: TypedRequest<Pagination>, res: Response) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    const pagedRoles = await Roles.findAndCountAll({
      ...getPagination(Number(page), Number(rowsPerPage)),
      ...getOrder(sortBy?.toString() || 'id', descending === 'true')
    });

    res.json({
      page: Number(page),
      rowsPerPage: Number(rowsPerPage),
      rowsNumber: pagedRoles.count,
      rows: pagedRoles.rows,
      sortBy: sortBy?.toString() || 'id',
      descending: descending === 'true',
    })
  }

  createRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newRole = await Roles.create(body);

      res.status(201).json(newRole)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
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

  deleteRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
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
