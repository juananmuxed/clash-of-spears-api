import { NextFunction, Request, Response } from "express";
import { TraitItem, Traits } from "../db/models/Traits";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";

export class TraitsController {

  private getTraitById(id?: number) {
    return Traits.findByPk(id, {
      include: [
        {
          model: Expansions,
          as: 'book',
          required: false,
          where: {
            active: true
          }
        },
      ]});
  }

  getTraits = async (_req: Request, res: Response) => {
    const traits = await Traits.findAll({
      include: [
        {
          model: Expansions,
          as: 'book',
          required: false,
          where: {
            active: true
          }
        },
      ]
    });

    res.json(traits)
  }

  getAllTraits = async (_req: Request, res: Response) => {
    const traits = await Traits.findAll();

    res.json(traits)
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
