import { NextFunction, Request, Response } from "express";
import { UserItem, Users } from "../db/models/Users";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Roles } from "../db/models/Roles";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

const include = {
  model: Roles,
  as: 'role'
}

export class UsersController {

  getUsers = async (_req: Request, res: Response) => {
    const users = await Users.findAll({
      include
    });

    res.json(users)
  }

  getUsersPaginated = async (req: TypedRequest<Pagination>, res: Response) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    const pagedUsers = await Users.findAndCountAll({
      include,
      ...getPagination(Number(page), Number(rowsPerPage)),
      ...getOrder(sortBy?.toString() || 'id', descending === 'true')
    });

    res.json({
      page: Number(page),
      rowsPerPage: Number(rowsPerPage),
      rowsNumber: pagedUsers.count,
      rows: pagedUsers.rows,
      sortBy: sortBy?.toString() || 'id',
      descending: descending === 'true',
    })
  }

  createUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newUser = await Users.create(body);

      res.status(201).json(newUser)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const user = await Users.findByPk(body.id);

      if(!user) next(new NotFoundError(ERRORS.NOT_FOUND('User')))

      const newUser = await user?.update(body)

      res.json(newUser)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const user = await Users.findByPk(body.id);

      if(!user) next(new NotFoundError(ERRORS.NOT_FOUND('User')))

      const newUser = await user?.destroy()

      res.json(newUser)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
