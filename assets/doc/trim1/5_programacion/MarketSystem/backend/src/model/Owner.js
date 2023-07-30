import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Users } from "./Users";

export const Owner = sequelize.define("owner", {
  id_owner: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//Union uno a uno
Users.hasOne(Owner, {
  foreignKey: "id_users",
  sourceKey: "id_users",
});

Owner.belongsTo(Users, {
  foreignKey: "id_users",
  tarjetId: "id_users",
});
