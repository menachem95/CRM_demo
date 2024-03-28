"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class CartItem extends sequelize_1.Model {
}
CartItem.init({
    cart_Item_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cart_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "carts",
            key: "cart_id",
        },
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "products",
            key: "product_id",
        },
    },
    // createdAt: { // Sequelize יוסיף אוטומטית תאריך ושעה כאשר הרשומה נוצרת
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
    // updatedAt: { // Sequelize יעדכן אוטומטית תאריך ושעה בכל פעם שהרשומה מתעדכנת
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   onUpdate: DataTypes.NOW,
    // },
    createdAt: {
        type: sequelize_1.DataTypes.DATE, // סוג הנתונים הוא תאריך
        allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE, // סוג הנתונים הוא תאריך
        allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
}, {
    tableName: "cart_items",
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = CartItem;
