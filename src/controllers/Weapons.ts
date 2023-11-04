import { NextFunction, Request, Response } from "express";
import { WeaponItem, Weapons, WeaponTypes } from "../db/models/Weapons";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
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
  {
    model: WeaponTypes,
    as: 'types',
    required: false,
    through: {
      attributes: []
    }
  }
];

export class WeaponsController {

  private getWeaponById(id?: number) {
    return Weapons.findByPk(id, {
      include
    });
  }

  getWeapons = async (_req: Request, res: Response) => {
    const weapons = await Weapons.findAll({
      include
    });

    res.json(weapons)
  }

  getWeaponsPaginated = async (req: TypedRequest<Pagination>, res: Response) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    const pagination = getPagination(Number(page), Number(rowsPerPage))

    const pagedWeapons = await Weapons.findAndCountAll({
      include,
      ...pagination,
      ...getOrder(sortBy?.toString() || 'id', descending === 'true')
    });

    res.json({
      page: Number(page),
      rowsPerPage: pagination.limit,
      rowsNumber: pagedWeapons.count,
      rows: pagedWeapons.rows,
      sortBy: sortBy?.toString() || 'id',
      descending: descending === 'true',
    })
  }

  createWeapon = async (req: TypedRequest<WeaponItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newWeapon = await Weapons.create(body);
      if(body.types) await newWeapon?.setTypes(body.types)

      res.status(201).json(await this.getWeaponById(newWeapon.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateWeapon = async (req: TypedRequest<WeaponItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const weapon = await Weapons.findByPk(body.id);

      if(!weapon) next(new NotFoundError(ERRORS.NOT_FOUND('Weapon')))

      const newWeapon = await weapon?.update(body);
      if(body.types) await newWeapon?.setTypes(body.types);

      res.json(await this.getWeaponById(newWeapon?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteWeapon = async (req: TypedRequest<WeaponItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const weapon = await Weapons.findByPk(body.id);

      if(!weapon) next(new NotFoundError(ERRORS.NOT_FOUND('Weapon')))

      const newWeapon = await weapon?.destroy()

      res.json(newWeapon)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
