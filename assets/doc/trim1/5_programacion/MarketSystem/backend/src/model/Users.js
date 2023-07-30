import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Users = sequelize.define(
  "users",
  {
    id_users: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
