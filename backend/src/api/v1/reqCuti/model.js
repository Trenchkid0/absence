import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db.js";
import { Users } from "../users/model.js";
import { Role } from "../roles/model.js";

export const RequestCuti = sequelize.define("req_cutis", {
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  leave_type: {
    type: DataTypes.ENUM("sakit", "izin", "cuti_tahunan"),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING(255),
  },
  status: {
    type: DataTypes.ENUM(
      "pending_head",
      "pending_gm",
      "approved",
      "rejected",
      "revision"
    ),
    defaultValue: "pending_head",
  },
  current_approver_role: {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id",
    },
  },
});

RequestCuti.belongsTo(Users, { as: "employee", foreignKey: "employee_id" });
RequestCuti.belongsTo(Role, {
  as: "approver",
  foreignKey: "current_approver_role",
});
