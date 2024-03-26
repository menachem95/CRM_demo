"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class User extends sequelize_1.Model {
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
