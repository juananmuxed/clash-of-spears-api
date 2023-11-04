import { NextFunction, Request, Response } from "express";
import { ExpansionItem, Expansions } from "../db/models/Expansions";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { Armies } from "../db/models/Armies";
import { ValidationError } from "sequelize";
import { Weapons } from "../db/models/Weapons";
import { Traits } from "../db/models/Traits";
import { Armors } from "../db/models/Armors";
import { getPagination, getOrder } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

const include = [
  {
    model: Armies,
    as: 'armies',
    required: false,
    where: {
      active: true
    }
  },
  {
    model: Weapons,
    as: 'weapons',
    required: false,
  },
  {
    model: Armors,
    as: 'armors',
    required: false,
  },
  {
    model: Traits,
    as: 'traits',
    required: false,
  },
];

export class ExpansionsController {

  getExpansions = async (_req: Request, res: Response) => {
    const expansions = await Expansions.findAll({
      where: {active: true},
      include
    });

    res.json(expansions)
  }

  getExpansionsPaginated = async (req: TypedRequest<Pagination>, res: Response) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    const pagination = getPagination(Number(page), Number(rowsPerPage))

    const pagedExpansions = await Expansions.findAndCountAll({
      include,
      ...pagination,
      ...getOrder(sortBy?.toString() || 'id', descending === 'true')
    });

    res.json({
      page: Number(page),
      rowsPerPage: pagination.limit,
      rowsNumber: pagedExpansions.count,
      rows: pagedExpansions.rows,
      sortBy: sortBy?.toString() || 'id',
      descending: descending === 'true',
    })
  }

  getExpansion = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {

      const expansion = await Expansions.findByPk(id, {
        include
      });

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Expansion')))

      res.json(expansion)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createExpansion = async (req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newExpansion = await Expansions.create(body);

      res.status(201).json(newExpansion)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateExpansion = async (req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Expansion')))

      const newExpansion = await expansion?.update(body)

      res.json(newExpansion)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteExpansion = async (req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Expansion')))

      const newExpansion = await expansion?.destroy()

      res.json(newExpansion)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
