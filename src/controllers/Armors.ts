import { NextFunction, Request, Response } from "express";
import { ArmorItem, ArmorModel, Armors } from "../db/models/Armors";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder, pagedResponse } from './utils/Pagination';
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
]

export class ArmorsController {

  private getArmorById(id?: number) {
    return Armors.findByPk(id, {
      include
    });
  }

  getArmors = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const armors = await Armors.findAll({
        include
      });

      res.json(armors)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getArmorsPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage))
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedArmors = await Armors.findAndCountAll({
        include,
        ...pagination,
        order
      });

      res.json(pagedResponse<ArmorModel>(pagedArmors, pagination, order))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createArmor = async (req: TypedRequest<ArmorItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newArmor = await Armors.create(body);

      res.status(201).json(await this.getArmorById(newArmor.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateArmor = async (req: TypedRequest<ArmorItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const armor = await Armors.findByPk(body.id);

      if(!armor) next(new NotFoundError(ERRORS.NOT_FOUND('Armor')))

      const newArmor = await armor?.update(body);

      res.json(await this.getArmorById(newArmor?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteArmor = async (req: TypedRequest<ArmorItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const armor = await Armors.findByPk(body.id);

      if(!armor) next(new NotFoundError(ERRORS.NOT_FOUND('Armor')))

      const newArmor = await armor?.destroy()

      res.json(newArmor)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
