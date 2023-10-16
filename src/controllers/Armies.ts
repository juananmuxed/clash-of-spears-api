import { NextFunction, Request, Response } from "express";
import { Armies, ArmyItem } from "../db/models/Armies";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";

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
