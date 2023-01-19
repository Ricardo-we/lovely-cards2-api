"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCode = exports.UserPlan = exports.PlanTypes = exports.User = void 0;
const db_utils_1 = require("../../utils/Db/db.utils");
const sequelize_1 = require("sequelize");
const DbRepository_1 = __importDefault(require("../../services/db/DbRepository"));
const model_1 = require("../helpers/model");
const db_fields_1 = require("../../utils/Db/db.fields");
const crypt_utils_1 = require("../../utils/crypt.utils");
const conn = DbRepository_1.default.getConnection("postgres");
const UserCode = conn.define("user_validation_code", {
    cron_id: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: false,
        defaultValue: (0, crypt_utils_1.getRandomNumbers)(),
    }
});
exports.UserCode = UserCode;
const User = conn.define("users", {
    id: (0, db_fields_1.IdField)(),
    username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [3, 255]
        },
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [4, 255],
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING(400),
        allowNull: false,
        validate: {
            isEmail: { msg: "Invalid Email" },
        }
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false
    }
});
exports.User = User;
const PlanTypes = conn.define("plan_types", {
    id: (0, db_fields_1.IdField)(),
    plan_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT(),
        allowNull: false,
        defaultValue: 0
    }
});
exports.PlanTypes = PlanTypes;
const UserPlan = conn.define("user_plan", {
    id: (0, db_fields_1.IdField)(),
});
exports.UserPlan = UserPlan;
(0, db_utils_1.oneToManyRelation)(PlanTypes, UserPlan, { foreignKey: { allowNull: true, name: "plan_id" } });
(0, db_utils_1.oneToManyRelation)(User, UserPlan, { foreignKey: { allowNull: true, name: "user_id" } });
(0, db_utils_1.oneToOneRelation)(User, UserCode, { foreignKey: { allowNull: true, name: "user_id" } });
(0, db_utils_1.oneToOneRelation)(model_1.Helper, User, { as: "language", foreignKey: { allowNull: true, name: "language_id" } });
