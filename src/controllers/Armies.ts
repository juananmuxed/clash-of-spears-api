import { NextFunction, Request, Response } from "express";
import { Armies, ArmyItem } from "../db/models/Armies";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { OrderItem, ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

const include = {
  model: Expansions,
  as: 'expansion'
};

export class ArmiesController {
  getArmies = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const armies = await Armies.findAll({
        where: {active: true},
        include,
      });

      res.json(armies)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getArmiesPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage));
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedArmies = await Armies.findAndCountAll({
        include,
        ...pagination,
        order: [
          [ order.sortBy, order.descending ] as OrderItem
        ]
      });

      res.json({
        page: pagination.page,
        rowsPerPage: pagination.limit,
        rowsNumber: pagedArmies.count,
        rows: pagedArmies.rows,
        sortBy: order.sortBy,
        descending: order.descending === 'DESC',
      })
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getAllArmies = async (_req: Request, res: Response) => {
    const armies = await Armies.findAll();

    res.json(armies)
  }

  createArmy = async (req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newArmy = await Armies.create(body);

      res.status(201).json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateArmy = async (req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const army = await Armies.findByPk(body.id);

      if(!army) next(new NotFoundError(ERRORS.NOT_FOUND('Army')))

      const newArmy = await army?.update(body)

      res.json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteArmy = async (req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const army = await Armies.findByPk(body.id);

      if(!army) next(new NotFoundError(ERRORS.NOT_FOUND('Army')))

      const newArmy = await army?.destroy()

      res.json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
