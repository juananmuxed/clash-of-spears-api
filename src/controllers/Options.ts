import { NextFunction, Request, Response } from "express";
import { OptionItem, OptionModel, Options } from "../db/models/Options";
import { Armies } from "../db/models/Armies";
import { Armors } from "../db/models/Armors";
import { Weapons } from "../db/models/Weapons";
import { Traits } from "../db/models/Traits";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { InternalError, NotFileError, NotFoundError } from "../models/Errors";
import { ValidationError } from "sequelize";
import { ERRORS } from "../config/data/Errors";
import { getPagination, getOrder, pagedResponse } from './utils/Pagination';
import { Pagination } from "../models/Pagination";
import { MIME_TYPES } from "../config/data/MimeTypes";
import { convertCsv } from "./utils/ConvertCsv";

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
  },
]

export { include as includeOptions }

export class OptionsController {
  private getOptionById(id?: number) {
    return Options.findByPk(id, { include });
  }

  private async setIncludes(item: OptionItem, option?: OptionModel) {
    if(item.armies) await option?.setArmies(item.armies);
    if(item.incompatibleShields) await option?.setIncompatibleShields(item.incompatibleShields);
    if(item.neededWeapons) await option?.setNeededWeapons(item.neededWeapons);
    if(item.incompatibleWeapons) await option?.setIncompatibleWeapons(item.incompatibleWeapons);
    if(item.upgradeTraits) await option?.setUpgradeTraits(item.upgradeTraits);
    if(item.neededTraits) await option?.setNeededTraits(item.neededTraits);
    if(item.removeTraits) await option?.setRemoveTraits(item.removeTraits);
    if(item.incompatibleTraits) await option?.setIncompatibleTraits(item.incompatibleTraits);
  }

  getOptions = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const options = await Options.findAll({
        include
      });

      res.json(options);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  getOptionsPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const { page, rowsPerPage, sortBy, descending } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage))
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedOptions = await Options.findAndCountAll({
        include,
        ...pagination,
        order
      });

      res.json(pagedResponse<OptionModel>(pagedOptions, pagination, order))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  createOption = async (req: TypedRequest<OptionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newOption = await Options.create(body);

      await this.setIncludes(body, newOption);

      res.status(201).json(await this.getOptionById(newOption.id))
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  bulkCreateOptions = async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req;

    try {
      if(!file) {
        return next(new NotFileError());
      }

      if(!MIME_TYPES.CSV.includes(file.mimetype)) {
        return next(new NotFileError(ERRORS.NOT_SUPPORTED_FILE));
      }

      const dataFromCSV = convertCsv<OptionItem>(file);

      const options = await Options.bulkCreate(dataFromCSV);

      options.forEach(async (option, index) => {
        await this.setIncludes(dataFromCSV[index], option);
      });

      res.status(201).json(options);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  }

  updateOption = async (req: TypedRequest<OptionItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const option = await Options.findByPk(body.id);

      if(!option) next(new NotFoundError(ERRORS.NOT_FOUND('Option')))

      const newOption = await option?.update(body);

      await this.setIncludes(body, newOption);

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
