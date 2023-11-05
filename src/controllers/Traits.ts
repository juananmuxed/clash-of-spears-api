import { NextFunction, Request, Response } from "express";
import { TraitItem, Traits } from "../db/models/Traits";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { OrderItem, ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

const include = [
  {
    model: Expansions,
    as: 'book',
    required: false,
    where: {
      active: true
    }
  },
];

export class TraitsController {

  private getTraitById(id?: number) {
    return Traits.findByPk(id, {
      include
    });
  }

  getTraits = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const traits = await Traits.findAll({
        include
      });

      res.json(traits)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getTraitsPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage))
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedTraits = await Traits.findAndCountAll({
        include,
        ...pagination,
        order: [
          [ order.sortBy, order.descending ] as OrderItem
        ]
      });

      res.json({
        page: pagination.page,
        rowsPerPage: pagination.limit,
        rowsNumber: pagedTraits.count,
        rows: pagedTraits.rows,
        sortBy: order.sortBy,
        descending: order.descending === 'DESC',
      })
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createTrait = async (req: TypedRequest<TraitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newTrait = await Traits.create(body);

      res.status(201).json(await this.getTraitById(newTrait.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateTrait = async (req: TypedRequest<TraitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const trait = await Traits.findByPk(body.id);

      if(!trait) next(new NotFoundError(ERRORS.NOT_FOUND('Trait')))

      const newTrait = await trait?.update(body);

      res.json(await this.getTraitById(newTrait?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteTrait = async (req: TypedRequest<TraitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const trait = await Traits.findByPk(body.id);

      if(!trait) next(new NotFoundError(ERRORS.NOT_FOUND('Trait')))

      const newTrait = await trait?.destroy()

      res.json(newTrait)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
