import { NextFunction, Request, Response } from "express";
import { Armies } from "../db/models/Armies";
import { Armors } from "../db/models/Armors";
import { Options } from "../db/models/Options";
import { Traits } from "../db/models/Traits";
import { UnitItem, UnitModel, UnitTypes, Units } from "../db/models/Units";
import { Weapons } from "../db/models/Weapons";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ValidationError } from "sequelize";
import { ERRORS } from "../config/data/Errors";
import { includeOptions } from "./Options";
import { getPagination, getOrder, pagedResponse } from './utils/Pagination';
import { Pagination } from "../models/Pagination";

const include = [
  {
    model: Armies,
    as: 'armies',
    required: false,
    where: {
      active: true
    },
    through: {
      attributes: []
    }
  },
  {
    model: UnitTypes,
    as: 'type',
    required: false,
  },
  {
    model: Armors,
    as: 'body',
    required: false,
  },
  {
    model: Armors,
    as: 'shield',
    required: false,
  },
  {
    model: Armors,
    as: 'barding',
    required: false,
  },
  {
    model: Weapons,
    as: 'weapon',
    required: false,
  },
  {
    model: Traits,
    as: 'traits',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Options,
    as: 'options',
    required: false,
    through: {
      attributes: []
    },
    include: includeOptions
  },
];

export class UnitsController {
  private getUnitById(id?: number) {
    return Units.findByPk(id, { include });
  }

  getUnits = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const options = await Units.findAll({
        include
      });

      res.json(options);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getUnitsPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage))
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedUnits = await Units.findAndCountAll({
        include,
        ...pagination,
        order
      });

      res.json(pagedResponse<UnitModel>(pagedUnits, pagination, order))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createUnit = async (req: TypedRequest<UnitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newUnit = await Units.create(body);

      if(body.armies) await newUnit.setArmies(body.armies);
      if(body.traits) await newUnit.setTraits(body.traits);
      if(body.options) await newUnit.setOptions(body.options);

      res.status(201).json(await this.getUnitById(newUnit.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateUnit = async (req: TypedRequest<UnitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const option = await Units.findByPk(body.id);

      if(!option) next(new NotFoundError(ERRORS.NOT_FOUND('Unit')))

      const newUnit = await option?.update(body);

      if(body.armies) await newUnit?.setArmies(body.armies);
      if(body.traits) await newUnit?.setTraits(body.traits);
      if(body.options) await newUnit?.setOptions(body.options);

      res.json(await this.getUnitById(newUnit?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteUnit = async (req: TypedRequest<UnitItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const weapon = await Units.findByPk(body.id);

      if(!weapon) next(new NotFoundError(ERRORS.NOT_FOUND('Unit')))

      const newUnit = await weapon?.destroy()

      res.json(newUnit)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
