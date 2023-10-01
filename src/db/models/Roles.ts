import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../Connection";
import { Users } from "./Users";

export interface RoleItem {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleModel
  extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>>,
  RoleItem {}

export const Roles = db.define<RoleModel>(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
    },
  },
  { underscored: true }
);

Roles.hasMany(Users, { as: "users" });
