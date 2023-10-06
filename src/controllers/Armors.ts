import { NextFunction, Request, Response } from "express";
import { ArmorItem, Armors } from "../db/models/Armors";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";

export class ArmorsController {

  private getArmorById(id?: number) {
    return Armors.findByPk(id, {
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

  getArmors = async (_req: Request, res: Response) => {
    const armors = await Armors.findAll({
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

    res.json(armors)
  }

  getAllArmors = async (_req: Request, res: Response) => {
    const armors = await Armors.findAll();

    res.json(armors)
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
