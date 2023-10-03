import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../Connection";
import { Authentication } from "../../models/Authentication";

export interface UserItem {
  id: number;
  email: string;
  password: string;
  username: string;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const auth = new Authentication()

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>, UserItem {}

export const Users = db.define<UserModel>(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
  },
  { underscored: true }
);

const encryptPassword = async (user: UserModel) => {
  if(user.changed('password')) user.set('password', await auth.passwordHash(user.password))
}

Users.beforeCreate(encryptPassword);
Users.beforeUpdate(encryptPassword);
