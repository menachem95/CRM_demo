"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class UserRelationship extends sequelize_1.Model {
}
UserRelationship.init({
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "users",
            key: "user_id",
        },
    },
    agent_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "users",
            key: "user_id",
        },
    },
}, {
    tableName: "user_relationships",
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = UserRelationship;
