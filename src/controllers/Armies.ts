import { NextFunction, Request, Response } from "express";
import { Armies, ArmyItem } from "../db/models/Armies";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { ValidationError } from "sequelize";
import { Expansions } from "../db/models/Expansions";

export class ArmiesController {
  async getArmies(_req: Request, res: Response) {
    const armies = await Armies.findAll({ 
      where: {active: true},
      include: {
        model: Expansions,
        as: 'expansion'
      }
    });
        
    res.json(armies)
  }

  async getAllArmies(_req: Request, res: Response) {
    const armies = await Armies.findAll();
    
    res.json(armies)
  }

  async createArmy(req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const newArmy = await Armies.create(body);
        
      res.status(201).json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
  
  async updateArmy(req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const expansion = await Armies.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Army')))
      
      const newArmy = await expansion?.update(body)
        
      res.json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
 
  async deleteArmy(req: TypedRequest<ArmyItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const expansion = await Armies.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Army')))
      
      const newArmy = await expansion?.destroy()
        
      res.json(newArmy)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}