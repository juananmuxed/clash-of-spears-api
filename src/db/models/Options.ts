import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";
import { Armies } from "./Armies";
import { Armors } from "./Armors";
import { Weapons } from "./Weapons";
import { Traits } from "./Traits";

export interface OptionItem {
  id: number;
  name: string;
  cost: number;
  fixedCost?: number;
  fixedUnits?: number;
  upgradeWeapon?: number;
  upgradeBody?: number;
  upgradeShield?: number;
  upgradeBarding?: number;
}

export interface OptionModel extends Model<InferAttributes<OptionModel>, InferCreationAttributes<OptionModel>>, OptionItem {}

export const Options = db.define<OptionModel>('options', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  cost: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  fixedCost: DataTypes.TINYINT,
  fixedUnits: DataTypes.TINYINT,
}, { underscored: true, timestamps: false });

export const OptionsArmies = db.define('options_armies', {
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Options,
      key: 'id'
    }
  },
  armyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Armies,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Options.belongsToMany(Armies, { through: OptionsArmies, as: 'armies' });
Armies.belongsToMany(Options, { through: OptionsArmies, as: 'options' });

export const OptionsArmors = db.define('options_armors', {
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Options,
      key: 'id'
    }
  },
  armorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Armors,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Options.belongsToMany(Armors, { through: OptionsArmors, as: 'incompatibleShields' });
Armors.belongsToMany(Options, { through: OptionsArmors, as: 'incompatibleOptions' });

export const OptionsWeapons = db.define('options_weapons', {
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Options,
      key: 'id'
    }
  },
  weaponId: {
    type: DataTypes.INTEGER,
    references: {
      model: Weapons,
      key: 'id'
    }
  },
  incompatibleWeaponId: {
    type: DataTypes.INTEGER,
    references: {
      model: Weapons,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Options.belongsToMany(Weapons, { through: OptionsWeapons, as: 'neededWeapons', otherKey: 'weaponId' });
Weapons.belongsToMany(Options, { through: OptionsWeapons, as: 'neededOptions' });

Options.belongsToMany(Weapons, { through: OptionsWeapons, as: 'incompatibleWeapons', otherKey: 'incompatibleWeaponId' });
Weapons.belongsToMany(Options, { through: OptionsWeapons, as: 'incompatibleOptions' });

export const OptionsTraits = db.define('options_traits', {
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Options,
      key: 'id'
    }
  },
  traitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traits,
      key: 'id'
    }
  },
  neededTraitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traits,
      key: 'id'
    }
  },
  removeTraitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traits,
      key: 'id'
    }
  },
  incompatibleTraitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traits,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Options.belongsToMany(Traits, { through: OptionsTraits, as: 'upgradeTraits', otherKey: 'traitId'});
Traits.belongsToMany(Options, { through: OptionsTraits, as: 'traitsUpgrade' });

Options.belongsToMany(Traits, { through: OptionsTraits, as: 'neededTraits', otherKey: 'neededTraitId'});
Traits.belongsToMany(Options, { through: OptionsTraits, as: 'traitsNeeded' });

Options.belongsToMany(Traits, { through: OptionsTraits, as: 'removeTraits', otherKey: 'removeTraitId'});
Traits.belongsToMany(Options, { through: OptionsTraits, as: 'traitsRemoved' });

Options.belongsToMany(Traits, { through: OptionsTraits, as: 'incompatibleTraits', otherKey: 'incompatibleTraitId'});
Traits.belongsToMany(Options, { through: OptionsTraits, as: 'traitsIncompatible' });

Options.belongsTo(Armors, { foreignKey: 'upgradeBody', as: 'body' });
Options.belongsTo(Armors, { foreignKey: 'upgradeShield', as: 'shield' });
Options.belongsTo(Armors, { foreignKey: 'upgradeBarding', as: 'barding' });

Options.belongsTo(Weapons, { foreignKey: 'upgradeWeapon', as: 'weapon'});
