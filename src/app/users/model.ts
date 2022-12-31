import { oneToManyRelation, oneToOneRelation } from "../../utils/Db/db.utils";

import { DataTypes } from "sequelize";
import DbRepository from "../../services/db/DbRepository";
import { IdField } from "../../utils/Db/db.fields";
import { getRandomNumbers } from "../../utils/crypt.utils";

const conn = DbRepository.getConnection("postgres");

const UserCode = conn.define("user_validation_code", {
    cron_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: getRandomNumbers(),
    }
})

const User = conn.define("users", {
    id: IdField(),
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [3, 255]
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [4, 255],
        }
    },
    email: {
        type: DataTypes.STRING(400),
        allowNull: false,
        validate: {
            isEmail: { msg: "Invalid Email" },
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
        allowNull: false
    }
})

const PlanTypes = conn.define("plan_types", {
    id: IdField(),
    plan_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
        defaultValue: 0
    }
})

const UserPlan = conn.define("user_plan", {
    id: IdField(),
});

oneToManyRelation(PlanTypes, UserPlan, { foreignKey: { allowNull: true, name: "plan_id" } });
oneToManyRelation(User, UserPlan, { foreignKey: { allowNull: true, name: "user_id" } });
oneToOneRelation(User, UserCode, { foreignKey: { allowNull: true, name: "user_id" } });


export {
    User,
    PlanTypes,
    UserPlan,
    UserCode
}
