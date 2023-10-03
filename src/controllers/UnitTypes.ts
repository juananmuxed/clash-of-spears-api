import { NextFunction, Request, Response } from "express";
import { UnitTypeItem, UnitTypes } from "../db/models/UnitTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";

export class UnitTypesController {

  getUnitTypes = async (_req: Request, res: Response) => {
    const unitTypes = await UnitTypes.findAll();

    res.json(unitTypes)
  }

  createUnitType = async (req: TypedRequest<UnitTypeItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newUnitType = await UnitTypes.create(body);

      res.status(201).json(newUnitType)
    } catch (error) {
      next(new InternalError((error as Error).message, error as ValidationError))
    }
  }

  updateUnitType = async (req: TypedRequest<UnitTypeItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const unitType = await UnitTypes.findByPk(body.id);

      if(!unitType) return next(new NotFoundError(ERRORS.NOT_FOUND('Unit type')))

      const newUnitType = await unitType?.update(body)

      res.json(newUnitType)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteUnitType = async (req: TypedRequest<UnitTypeItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const unitType = await UnitTypes.findByPk(body.id);

      if(!unitType) next(new NotFoundError(ERRORS.NOT_FOUND('Unit type')))

      const newUnitType = await unitType?.destroy()

      res.json(newUnitType)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
