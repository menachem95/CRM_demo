"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const CartItem_1 = __importDefault(require("./CartItem"));
const Product_1 = __importDefault(require("./Product"));
class Cart extends sequelize_1.Model {
    static async getItemsForCart(cartId) {
        const items = await CartItem_1.default.findAll({
            where: {
                cart_id: cartId
            },
            include: [{
                    model: Product_1.default, // ודא שמודל Product מיובא ומוגדר כראוי
                    // as: 'product' // 'as' צריך להיות תואם לזה שהוגדר בהגדרת הקשר ב-Sequelize
                }]
        });
        return items;
    }
}
Cart.init({
    cart_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "users",
            key: "user_id",
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
    // createdAt: {
    //   type: DataTypes.DATE, // סוג הנתונים הוא תאריך
    //   allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    // },
    // updatedAt: {
    //   type: DataTypes.DATE, // סוג הנתונים הוא תאריך
    //   allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    // },
}, {
    tableName: "carts",
    timestamps: false,
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = Cart;
