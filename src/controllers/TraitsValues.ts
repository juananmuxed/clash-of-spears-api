import { NextFunction, Request, Response } from "express";
import { TraitItem, TraitModel, TraitValueItem, TraitValueModel, Traits, TraitsValues } from "../db/models/Traits";
import { InternalError, NotFileError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder, pagedResponse } from './utils/Pagination';
import { Pagination } from "../models/Pagination";
import { MIME_TYPES } from "../config/data/MimeTypes";
import { convertCsv } from "./utils/ConvertCsv";
import { Armors } from "../db/models/Armors";
import { Weapons } from "../db/models/Weapons";

const include = [
  {
    model: Armors,
    as: 'armor',
  },
  {
    model: Weapons,
    as: 'weapon',
  },
];

export class TraitsValuesController {

  private getTraitValueById(id?: number) {
    return TraitsValues.findByPk(id, {
      include
    });
  }

  getTraitsValues = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const traitsValues = await TraitsValues.findAll({
        include
      });

      res.json(traitsValues)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getTraitsValuesPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage))
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedTraitsValues = await TraitsValues.findAndCountAll({
        include,
        ...pagination,
        order
      });

      res.json(pagedResponse<TraitValueModel>(pagedTraitsValues, pagination, order))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createTraitValue = async (req: TypedRequest<TraitValueItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newTraitValue = await TraitsValues.create(body);

      res.status(201).json(await this.getTraitValueById(newTraitValue.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  bulkCreateTraitsValues = async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req;

    try {
      if(!file) {
        return next(new NotFileError());
      }

      if(!MIME_TYPES.CSV.includes(file.mimetype)) {
        return next(new NotFileError(ERRORS.NOT_SUPPORTED_FILE));
      }

      const dataFromCSV = convertCsv<TraitValueItem>(file);

      const traitsValues = await TraitsValues.bulkCreate(dataFromCSV);

      res.status(201).json(traitsValues);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  }

  updateTraitValue = async (req: TypedRequest<TraitValueItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const traitValue = await TraitsValues.findByPk(body.id);

      if(!traitValue) next(new NotFoundError(ERRORS.NOT_FOUND('Trait')))

      const newTraitValue = await traitValue?.update(body);

      res.json(await this.getTraitValueById(newTraitValue?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteTraitValue = async (req: TypedRequest<TraitValueItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const traitValue = await TraitsValues.findByPk(body.id);

      if(!traitValue) next(new NotFoundError(ERRORS.NOT_FOUND('Trait')))

      const newTraitValue = await traitValue?.destroy()

      res.json(newTraitValue)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
