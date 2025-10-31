import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";

export const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM("employee", "head", "gm"),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// module.exports = Role;
