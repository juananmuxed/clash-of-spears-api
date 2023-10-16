import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";
import { Traits } from "./Traits";
import { Armies } from "./Armies";
import { Options } from "./Options";
import { Armors } from "./Armors";
import { Weapons } from "./Weapons";

export interface UnitTypeItem {
  id: number;
  name: string;
}

export interface UnitItem {
  id: number;
  name: string;
  unitType: number;
  combat?: number;
  ranged?: number;
  grit?: number;
  defaultWeapon?: number;
  defaultBody?: number;
  defaultBarding?: number;
  defaultShield?: number;
  cost: number;
  fixedFigures?: number;
  fixedSave?: number;
  fixedCost?: number;
  notForBreak?: boolean;
  countsDouble?: boolean;
  noCountForBreak?: boolean;
  isLeader?: boolean;
  noStats?: boolean;
  zeroFigures?: boolean;
  freeUnits?: number;
  commandRange?: number;
  commandPoints?: number;
}

export interface UnitModel extends Model<InferAttributes<UnitModel>, InferCreationAttributes<UnitModel>>, UnitItem {}
export interface UnitTypeModel extends Model<InferAttributes<UnitTypeModel>, InferCreationAttributes<UnitTypeModel>>, UnitTypeItem {}


export const Units = db.define<UnitModel>('units',
  {
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
    unitType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    combat: DataTypes.TINYINT,
    ranged: DataTypes.TINYINT,
    grit: DataTypes.TINYINT,
    cost: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    fixedFigures: DataTypes.TINYINT,
    fixedSave: DataTypes.TINYINT,
    fixedCost: DataTypes.TINYINT,
    notForBreak: DataTypes.BOOLEAN,
    countsDouble: DataTypes.BOOLEAN,
    noCountForBreak: DataTypes.BOOLEAN,
    isLeader: DataTypes.BOOLEAN,
    noStats: DataTypes.BOOLEAN,
    zeroFigures: DataTypes.BOOLEAN,
    freeUnits: DataTypes.TINYINT,
    commandRange: DataTypes.TINYINT,
    commandPoints: DataTypes.TINYINT,
  },
  { underscored: true, timestamps: false }
);

export const UnitTypes = db.define<UnitTypeModel>('unit_type',
  {
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
  },
  { underscored: true, timestamps: false }
);

export const UnitsTraits = db.define('units_traits', {
  unitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Units,
      key: 'id'
    }
  },
  traitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Traits,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Units.belongsToMany(Traits, { through: UnitsTraits, as: 'traits' });
Traits.belongsToMany(Units, { through: UnitsTraits, as: 'units' });

export const UnitsArmies = db.define('units_armies', {
  unitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Units,
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

Units.belongsToMany(Armies, { through: UnitsArmies, as: 'armies' });
Armies.belongsToMany(Units, { through: UnitsArmies, as: 'units' });

export const UnitsOptions = db.define('units_options', {
  unitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Units,
      key: 'id'
    }
  },
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Options,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Units.belongsToMany(Options, { through: UnitsOptions, as: 'options' });
Options.belongsToMany(Units, { through: UnitsOptions, as: 'units' });

Units.belongsTo(Armors, { foreignKey: 'defaultBody', as: 'body' });
Units.belongsTo(Armors, { foreignKey: 'defaultBarding', as: 'barding' });
Units.belongsTo(Armors, { foreignKey: 'defaultShield', as: 'shield' });

Units.belongsTo(Weapons, { foreignKey: 'defaultWeapon', as: 'weapon'});

Units.belongsTo(UnitTypes, { foreignKey: 'unitTypeId', as: 'type'} );
