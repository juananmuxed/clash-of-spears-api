/* eslint-disable no-use-before-define */
import { BelongsToCreateAssociationMixin, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";
import { Weapons } from "./Weapons";
import { Armors } from "./Armors";

export interface TraitItem extends Record<string, unknown> {
  id: number;
  name: string;
  requires?: boolean;
  value?: boolean;
  bookPage?: number;
  expansionId?: number;
  createValue: BelongsToCreateAssociationMixin<TraitValueModel>;
}

export interface TraitModel extends Model<InferAttributes<TraitModel>, InferCreationAttributes<TraitModel>>, TraitItem {}

export interface TraitValueItem extends Record<string, unknown> {
  id: number;
  value?: number;
  weaponId?: number;
  armorId?: number;
}

export interface TraitValueModel extends Model<InferAttributes<TraitValueModel>, InferCreationAttributes<TraitValueModel>>, TraitValueItem {}

export const Traits = db.define<TraitModel>('traits', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(40),
  },
  requires: {
    type: DataTypes.BOOLEAN,
  },
  bookPage: {
    type: DataTypes.INTEGER,
  },
}, { underscored: true, timestamps: false});

export const TraitsValues = db.define<TraitValueModel>('traits_values', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  value: DataTypes.INTEGER,
}, { underscored: true, timestamps: false});

TraitsValues.belongsTo(Weapons, { foreignKey: 'weaponId', as: 'weapon' });
TraitsValues.belongsTo(Armors, { foreignKey: 'armorId', as: 'armor' });

Traits.belongsTo(TraitsValues, { foreignKey: 'valueId', as: 'value' });
