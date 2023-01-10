import { DataTypes } from "sequelize";
import DbRepository from "../../services/db/DbRepository";
import { Helper } from "../helpers/model";
import { IdField } from "../../utils/Db/db.fields";
import { User } from "../users/model";
import { oneToManyRelation } from "../../utils/Db/db.utils";
const conn = DbRepository.getConnection("postgres");

const CARD_BACKGROUND_TYPES = ["decorated_image", "image", "color"];
const CARD_TYPES = ["book", "cards", "slides","cube", "flip"];

const Card = conn.define("card", {
    id: IdField(),
    title: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    music: {
        type: DataTypes.STRING(400),
        allowNull: true
    },
    music_public_id: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    card_background: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "#ff0000"
    },
    card_background_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isIn: [CARD_BACKGROUND_TYPES]
            // validBackgroundTypes: (value: any) => CARD_BACKGROUND_TYPES.includes(value)
        },
        defaultValue: "color"
    },
    card_type: {
        type: DataTypes.STRING(150),
        allowNull: true,
        validate:{
            isIn: [CARD_TYPES]
        },
        defaultValue: "book"
    }
})

const CardMessage =  conn.define("card_message", {
    id: IdField(),
    heading: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    content: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "#fedc00"
    },
    orderNumber: {
        type: DataTypes.INTEGER(),
        allowNull: true,
    }
})

const CardImage = conn.define("card_image", {
    id: IdField(),
    image_url: {
        type: DataTypes.STRING(650),
        allowNull: false,
    },
    image_id: {
        type: DataTypes.STRING(650),
        allowNull: true,
    },
    orderNumber: {
        type: DataTypes.INTEGER(),
        allowNull: true,
    }
})

oneToManyRelation(User, Card, {
    foreignKey: {
        allowNull:true,
        name: "user_id"
    },
    onDelete: "cascade",
    onUpdate: "cascade"
})


/*** @CARD -> @CardMessage || @CardImage */
oneToManyRelation(Card, CardMessage, {
    foreignKey: {
        allowNull: true,
        name: "card_id",
    },
    as: "cardMessages",
    onDelete: "cascade",
    onUpdate: "cascade"
})
oneToManyRelation(Card, CardImage, {
    foreignKey: {
        allowNull: true,
        name: "card_id",
    },
    as: "cardImages",
    onDelete: "cascade",
    onUpdate: "cascade"
})

export {
    Card,
    CardMessage, 
    CardImage
}
