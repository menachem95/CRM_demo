import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

 interface CartAttributes {
  cart_id: number;
  customer_id: number;
  createdAt?: Date; // הוספת שדה תאריך יצירה
  updatedAt?: Date; // הוספת שדה תאריך עדכון
}

interface CartCreationAttributes extends Optional<CartAttributes, "cart_id"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public cart_id!: number;
  public customer_id!: number;
  public createdAt!: Date; // הוספת שדה תאריך יצירה
  public updatedAt!: Date; // הוספת שדה תאריך עדכון
  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

Cart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    createdAt: {
      type: DataTypes.DATE, // סוג הנתונים הוא תאריך
      allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
    updatedAt: {
      type: DataTypes.DATE, // סוג הנתונים הוא תאריך
      allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
  },
  {
    tableName: "carts",
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default Cart;

