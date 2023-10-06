/* eslint-disable no-use-before-define */
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";

export interface TraitItem {
  id: number;
  name: string;
  requires?: boolean;
  value?: boolean;
  bookPage?: number;
  expansionId?: number;
}

export interface TraitModel extends Model<InferAttributes<TraitModel>, InferCreationAttributes<TraitModel>>, TraitItem {}

export const Traits = db.define<TraitModel>('traits', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  requires: {
    type: DataTypes.BOOLEAN,
  },
  value: {
    type: DataTypes.BOOLEAN,
  },
  bookPage: {
    type: DataTypes.INTEGER,
  },
}, { underscored: true, timestamps: false})
