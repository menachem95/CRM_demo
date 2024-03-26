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
        type: new sequelize_1.DataTypes.DECIMAL(),
        allowNull: false,
    },
    cart_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true, references: {
            model: "carts",
            key: "cart_id",
        },
    },
    customer_id: {
        type: new sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        references: {
            model: "users",
            key: "user_id",
        },
    },
    agent_id: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false, references: {
            model: "users",
            key: "user_id",
        },
    },
}, {
    tableName: "deals",
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = Deal;
