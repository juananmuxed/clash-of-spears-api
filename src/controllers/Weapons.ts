import { NextFunction, Request, Response } from "express";
import { WeaponItem, Weapons, WeaponTypes } from "../db/models/Weapons";
import { InternalError, NotFileError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";
import { getPagination, getOrder, pagedResponse } from './utils/Pagination';
import { Pagination } from "../models/Pagination";
import { WeaponModel } from './../db/models/Weapons';
import { MIME_TYPES } from "../config/data/MimeTypes";
import { convertCsv } from "./utils/ConvertCsv";

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

  private async setIncludes(item: WeaponItem, weapon?: WeaponModel) {
    if(item.types) await weapon?.setTypes(item.types);
  }

  getWeapons = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const weapons = await Weapons.findAll({
        include
      });

      res.json(weapons)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getWeaponTypes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const weaponTypes = await WeaponTypes.findAll();

      res.json(weaponTypes)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getWeaponsPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage));
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedWeapons = await Weapons.findAndCountAll({
        include,
        ...pagination,
        order
      });

      res.json(pagedResponse<WeaponModel>(pagedWeapons, pagination, order))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createWeapon = async (req: TypedRequest<WeaponItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newWeapon = await Weapons.create(body);

      await this.setIncludes(body, newWeapon);

      res.status(201).json(await this.getWeaponById(newWeapon.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  bulkCreateWeapons = async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req;

    try {
      if(!file) {
        return next(new NotFileError());
      }

      if(!MIME_TYPES.CSV.includes(file.mimetype)) {
        return next(new NotFileError(ERRORS.NOT_SUPPORTED_FILE));
      }

      const dataFromCSV = convertCsv<WeaponItem>(file);

      const weapons = await Weapons.bulkCreate(dataFromCSV);

      weapons.forEach(async (weapon, index) => {
        await this.setIncludes(dataFromCSV[index], weapon);
      });

      res.status(201).json(weapons);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  }

  updateWeapon = async (req: TypedRequest<WeaponItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const weapon = await Weapons.findByPk(body.id);

      if(!weapon) next(new NotFoundError(ERRORS.NOT_FOUND('Weapon')))

      const newWeapon = await weapon?.update(body);

      await this.setIncludes(body, newWeapon);

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
