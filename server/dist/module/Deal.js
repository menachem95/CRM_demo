"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Deal extends sequelize_1.Model {
}
Deal.init({
    deal_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cart_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: "carts",
            key: "cart_id",
        },
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "users",
            key: "user_id",
        },
    },
    agent_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: "users",
            key: "user_id",
        },
    },
    inProgress: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
}, {
    tableName: "deals",
    timestamps: false,
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = Deal;
