import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";
// import { Reque } from "./LeaveRequest.js";
import { RequestCuti } from "../reqCuti/model.js";
import { Users } from "../users/model.js";

export const HistoryCuti = sequelize.define("historyCutis", {
  role: {
    type: DataTypes.ENUM("employee", "head", "gm"),
    allowNull: false,
  },
  actor: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

HistoryCuti.belongsTo(RequestCuti, {
  foreignKey: "req_cuti_id",
  onDelete: "CASCADE",
});
HistoryCuti.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
