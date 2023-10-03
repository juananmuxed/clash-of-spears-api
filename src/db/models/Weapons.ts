/* eslint-disable no-use-before-define */
import { DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";

export interface WeaponItem {
  id: number;
  name: string;
  rangeShort?: number;
  rangeLong?: number;
  saveModification?: number;
  initiative?: number;
  bookPage?: number;
  types?: number[];
  addTypes: HasManyAddAssociationsMixin<WeaponTypeModel, number>;
  getTypes: HasManyGetAssociationsMixin<WeaponTypeModel>;
  setTypes: HasManySetAssociationsMixin<WeaponTypeModel, number>;
}

export interface WeaponTypeItem {
  id: number;
  name: string;
}

export interface WeaponModel extends Model<InferAttributes<WeaponModel>, InferCreationAttributes<WeaponModel>>, WeaponItem {}
export interface WeaponTypeModel extends Model<InferAttributes<WeaponTypeModel>, InferCreationAttributes<WeaponTypeModel>>, WeaponTypeItem {}

export const Weapons = db.define<WeaponModel>('weapons', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  rangeShort: {
    type: DataTypes.INTEGER,
  },
  rangeLong: {
    type: DataTypes.INTEGER,
  },
  saveModification: {
    type: DataTypes.INTEGER,
  },
  initiative: {
    type: DataTypes.INTEGER,
  },
  bookPage: {
    type: DataTypes.INTEGER,
  },
}, { underscored: true, timestamps: false})

export const WeaponTypes = db.define<WeaponTypeModel>('weapon_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
  },
}, { underscored: true, timestamps: false})

export const WeaponsWeaponTypes = db.define('weapons_weapon_types', {
  weaponId: {
    type: DataTypes.INTEGER,
    references: {
      model: Weapons,
      key: 'id'
    }
  },
  weaponTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: WeaponTypes,
      key: 'id'
    }
  }
}, { underscored: true, timestamps: false });

Weapons.belongsToMany(WeaponTypes, { through: WeaponsWeaponTypes, as: 'types' });
WeaponTypes.belongsToMany(Weapons, { through: WeaponsWeaponTypes, as: 'weapons' });