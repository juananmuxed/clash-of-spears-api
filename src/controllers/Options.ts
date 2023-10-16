import { NextFunction, Request, Response } from "express";
import { OptionItem, Options } from "../db/models/Options";
import { Armies } from "../db/models/Armies";
import { Armors } from "../db/models/Armors";
import { Weapons } from "../db/models/Weapons";
import { Traits } from "../db/models/Traits";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFoundError } from "../models/Errors";
import { ValidationError } from "sequelize";
import { ERRORS } from "../config/data/Errors";

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
    model: Armors,
    as: 'incompatibleShields',
    required: false,
    through: {
      attributes: []
    }
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
    as: 'neededWeapons',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Weapons,
    as: 'incompatibleWeapons',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Weapons,
    as: 'weapon',
    required: false,
  },
  {
    model: Traits,
    as: 'upgradeTraits',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Traits,
    as: 'neededTraits',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Traits,
    as: 'removeTraits',
    required: false,
    through: {
      attributes: []
    }
  },
  {
    model: Traits,
    as: 'incompatibleTraits',
    required: false,
    through: {
      attributes: []
    }
  }
]

export class OptionsController {
  private getOptionById(id?: number) {
    return Options.findByPk(id, { include });
  }

  getOptions = async (_req: Request, res: Response) => {
    const options = await Options.findAll({
      include
    });

    res.json(options);
  }

  createOption = async (req: TypedRequest<OptionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newOption = await Options.create(body);

      if(body.armies) await newOption.setArmies(body.armies);
      if(body.incompatibleShields) await newOption.setIncompatibleShields(body.incompatibleShields);
      if(body.neededWeapons) await newOption.setNeededWeapons(body.neededWeapons);
      if(body.incompatibleWeapons) await newOption.setIncompatibleWeapons(body.incompatibleWeapons);
      if(body.upgradeTraits) await newOption.setUpgradeTraits(body.upgradeTraits);
      if(body.neededTraits) await newOption.setNeededTraits(body.neededTraits);
      if(body.removeTraits) await newOption.setRemoveTraits(body.removeTraits);
      if(body.incompatibleTraits) await newOption.setIncompatibleTraits(body.incompatibleTraits);

      res.status(201).json(await this.getOptionById(newOption.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  updateOption = async (req: TypedRequest<OptionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const option = await Options.findByPk(body.id);

      if(!option) next(new NotFoundError(ERRORS.NOT_FOUND('Option')))

      const newOption = await option?.update(body);

      if(body.armies) await newOption?.setArmies(body.armies);
      if(body.incompatibleShields) await newOption?.setIncompatibleShields(body.incompatibleShields);
      if(body.neededWeapons) await newOption?.setNeededWeapons(body.neededWeapons);
      if(body.incompatibleWeapons) await newOption?.setIncompatibleWeapons(body.incompatibleWeapons);
      if(body.upgradeTraits) await newOption?.setUpgradeTraits(body.upgradeTraits);
      if(body.neededTraits) await newOption?.setNeededTraits(body.neededTraits);
      if(body.removeTraits) await newOption?.setRemoveTraits(body.removeTraits);
      if(body.incompatibleTraits) await newOption?.setIncompatibleTraits(body.incompatibleTraits);

      res.json(await this.getOptionById(newOption?.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  deleteOption = async (req: TypedRequest<OptionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const weapon = await Options.findByPk(body.id);

      if(!weapon) next(new NotFoundError(ERRORS.NOT_FOUND('Option')))

      const newOption = await weapon?.destroy()

      res.json(newOption)
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
