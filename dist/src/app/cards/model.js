"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardImage = exports.CardMessage = exports.Card = void 0;
const sequelize_1 = require("sequelize");
const DbRepository_1 = __importDefault(require("../../services/db/DbRepository"));
const db_fields_1 = require("../../utils/Db/db.fields");
const model_1 = require("../users/model");
const db_utils_1 = require("../../utils/Db/db.utils");
const conn = DbRepository_1.default.getConnection("postgres");
const CARD_BACKGROUND_TYPES = ["decorated_image", "image", "color"];
const CARD_TYPES = ["book", "cards", "slides", "cube", "flip"];
const Card = conn.define("card", {
    id: (0, db_fields_1.IdField)(),
    title: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    music: {
        type: sequelize_1.DataTypes.STRING(400),
        allowNull: true
    },
    music_public_id: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: true
    },
    card_background: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "#ff0000"
    },
    card_background_type: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isIn: [CARD_BACKGROUND_TYPES]
            // validBackgroundTypes: (value: any) => CARD_BACKGROUND_TYPES.includes(value)
        },
        defaultValue: "color"
    },
    card_type: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
        validate: {
            isIn: [CARD_TYPES]
        },
        defaultValue: "book"
    },
    auto_play: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        defaultValue: false,
    }
});
exports.Card = Card;
const CardMessage = conn.define("card_message", {
    id: (0, db_fields_1.IdField)(),
    heading: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "#fedc00"
    },
    textColor: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "#000"
    },
    orderNumber: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: true,
    }
});
exports.CardMessage = CardMessage;
const CardImage = conn.define("card_image", {
    id: (0, db_fields_1.IdField)(),
    image_url: {
        type: sequelize_1.DataTypes.STRING(650),
        allowNull: false,
    },
    image_id: {
        type: sequelize_1.DataTypes.STRING(650),
        allowNull: true,
    },
    orderNumber: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: true,
    }
});
exports.CardImage = CardImage;
(0, db_utils_1.oneToManyRelation)(model_1.User, Card, {
    foreignKey: {
        allowNull: true,
        name: "user_id"
    },
    onDelete: "cascade",
    onUpdate: "cascade"
});
/*** @CARD -> @CardMessage || @CardImage */
(0, db_utils_1.oneToManyRelation)(Card, CardMessage, {
    foreignKey: {
        allowNull: true,
        name: "card_id",
    },
    as: "cardMessages",
    onDelete: "cascade",
    onUpdate: "cascade"
});
(0, db_utils_1.oneToManyRelation)(Card, CardImage, {
    foreignKey: {
        allowNull: true,
        name: "card_id",
    },
    as: "cardImages",
    onDelete: "cascade",
    onUpdate: "cascade"
});
