import { DataTypes, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";
import { Armies, ArmyModel } from "./Armies";
import { ArmorModel, Armors } from "./Armors";
import { WeaponModel, Weapons } from "./Weapons";
import { TraitModel, Traits } from "./Traits";

export interface OptionItem extends Record<string, unknown> {
  id: number;
  name: string;
  cost: number;
  fixedCost?: number;
  fixedUnits?: number;
  armies?: number[];
  incompatibleShields?: number[];
  neededWeapons?: number[];
  incompatibleWeapons?: number[];
  upgradeTraits?: number[];
  neededTraits?: number[];
  removeTraits?: number[];
  incompatibleTraits?: number[];
  upgradeWeapon?: number;
  upgradeBody?: number;
  upgradeShield?: number;
  upgradeBarding?: number;
  setArmies: HasManySetAssociationsMixin<ArmyModel, number>;
  setIncompatibleShields: HasManySetAssociationsMixin<ArmorModel, number>;
  setNeededWeapons: HasManySetAssociationsMixin<WeaponModel, number>;
  setIncompatibleWeapons: HasManySetAssociationsMixin<WeaponModel, number>;
  setUpgradeTraits: HasManySetAssociationsMixin<TraitModel, number>;
  setNeededTraits: HasManySetAssociationsMixin<TraitModel, number>;
  setRemoveTraits: HasManySetAssociationsMixin<TraitModel, number>;
  setIncompatibleTraits: HasManySetAssociationsMixin<TraitModel, number>;
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

export const OptionsArmors = db.define('options_armors_inc', {
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

export const OptionsWeapons = db.define('options_weapons_nee', {
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
}, { underscored: true, timestamps: false });

Options.belongsToMany(Weapons, { through: OptionsWeapons, as: 'neededWeapons', otherKey: 'weaponId' });
Weapons.belongsToMany(Options, { through: OptionsWeapons, as: 'neededOptions' });

export const OptionsWeaponsIncompatible = db.define('options_weapons_inc', {
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
  }
}, { underscored: true, timestamps: false });

Options.belongsToMany(Weapons, { through: OptionsWeaponsIncompatible, as: 'incompatibleWeapons', otherKey: 'weaponId' });
Weapons.belongsToMany(Options, { through: OptionsWeaponsIncompatible, as: 'incompatibleOptions' });

export const OptionsTraits = db.define('options_traits_upg', {
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
}, { underscored: true, timestamps: false });

Options.belongsToMany(Traits, { through: OptionsTraits, as: 'upgradeTraits', otherKey: 'traitId'});
Traits.belongsToMany(Options, { through: OptionsTraits, as: 'traitsUpgrade' });

export const OptionsTraitsNeeded = db.define('options_traits_nee', {
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
}, { underscored: true, timestamps: false });

Options.belongsToMany(Traits, { through: OptionsTraitsNeeded, as: 'neededTraits', otherKey: 'traitId'});
Traits.belongsToMany(Options, { through: OptionsTraitsNeeded, as: 'traitsNeeded' });

export const OptionsTraitsRemove = db.define('options_traits_rem', {
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
}, { underscored: true, timestamps: false });

Options.belongsToMany(Traits, { through: OptionsTraitsRemove, as: 'removeTraits', otherKey: 'traitId'});
Traits.belongsToMany(Options, { through: OptionsTraitsRemove, as: 'traitsRemoved' });

export const OptionsTraitsIncompatible = db.define('options_traits_inc', {
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
}, { underscored: true, timestamps: false });

Options.belongsToMany(Traits, { through: OptionsTraitsIncompatible, as: 'incompatibleTraits', otherKey: 'traitId'});
Traits.belongsToMany(Options, { through: OptionsTraitsIncompatible, as: 'traitsIncompatible' });

Options.belongsTo(Armors, { foreignKey: 'upgradeBody', as: 'body' });
Options.belongsTo(Armors, { foreignKey: 'upgradeShield', as: 'shield' });
Options.belongsTo(Armors, { foreignKey: 'upgradeBarding', as: 'barding' });

Options.belongsTo(Weapons, { foreignKey: 'upgradeWeapon', as: 'weapon'});
