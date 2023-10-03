import { NextFunction, Request, Response } from "express";
import { UserItem, Users } from "../db/models/Users";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Roles } from "../db/models/Roles";

export class UsersController {

  getUsers = async (_req: Request, res: Response) => {
    const users = await Users.findAll({
      include: {
        model: Roles,
        as: 'role'
      }
    });

    res.json(users)
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
