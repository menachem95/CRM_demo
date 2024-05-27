"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const Deal_1 = __importDefault(require("./Deal"));
const Cart_1 = __importDefault(require("./Cart"));
const Meeting_1 = __importDefault(require("./Meeting"));
class User extends sequelize_1.Model {
    static async getCurrentCartInProgres(customer_id) {
        const deal = await Deal_1.default.findOne({
            where: { inProgress: true, customer_id },
            // include: [
            //   {
            //     model: Cart, // ודא שמודל Product מיובא ומוגדר כראוי
            //     // as: 'product' // 'as' צריך להיות תואם לזה שהוגדר בהגדרת הקשר ב-Sequelize
            //   },
            // ],
        });
        console.log("deal", deal);
        if (!deal) {
            console.error("Deal not found for customer ID:", customer_id);
            throw new Error("deal not found");
        }
        else {
            const cart_id = deal.cart_id;
            const items = await Cart_1.default.getItemsForCart(+cart_id);
            console.log("items: ", items);
            return { cart_id, items };
        }
    }
    static async getMyMeetings(user_id, user_role) {
        let meetings;
        if (user_role === "AGENT") {
            meetings = await Meeting_1.default.findAll({
                where: {
                    agent_id: user_id,
                },
            });
        }
        else if (user_role === "CUSTOMER") {
            meetings = await Meeting_1.default.findAll({
                where: {
                    customer_id: user_id,
                },
            });
        }
        return meetings;
    }
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_role: {
        type: sequelize_1.DataTypes.ENUM("AGENT", "CUSTOMER"),
        allowNull: false,
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    sequelize: config_1.default, // העברת ה-instance של Sequelize
});
exports.default = User;
// class Product extends Model {}
// Product.init(
//   {
//     //   Productname: DataTypes.STRING,
//     //   birthday: DataTypes.DATE
//   },
//   { sequelize, modelName: "Product" }
// );
// export default Product;
// interface UserAttributes {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// }
// // Sequelize משתמש ב'Optional' כדי לציין תכונות שאינן נדרשות בעת יצירת המודל
// // כלומר, תכונות שניתן להשמיט בעת יצירת עצם User חדש
// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
// class User
//   extends Model<UserAttributes, UserCreationAttributes>
//   implements UserAttributes
// {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   // ניתן להוסיף כאן מתודות מופע ומחלקה
// }
// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "users",
//     sequelize, // העברת ה-instance של Sequelize
//   }
// );
