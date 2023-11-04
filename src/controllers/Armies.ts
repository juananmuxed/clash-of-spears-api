import { NextFunction, Request, Response } from "express";
import { Armies, ArmyItem } from "../db/models/Armies";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

export class ArmiesController {
  getArmies = async (_req: Request, res: Response) => {
    const armies = await Armies.findAll({
      where: {active: true},
      include: {
        model: Expansions,
        as: 'expansion'
      }
    });

    res.json(armies)
  }

  getArmiesPaginated = async (req: TypedRequest<Pagination>, res: Response) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    const pagination = getPagination(Number(page), Number(rowsPerPage))

    const pagedArmies = await Armies.findAndCountAll({
      ...getPagination(Number(page), Number(rowsPerPage)),
      ...getOrder(sortBy?.toString() || 'id', descending === 'true')
    });

    res.json({
      page: Number(page),
      rowsPerPage: pagination.limit,
      rowsNumber: pagedArmies.count,
      rows: pagedArmies.rows,
      sortBy: sortBy?.toString() || 'id',
      descending: descending === 'true',
    })
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
