import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

export interface CartItemAttributes {
  cart_Item_id: number;
  // customer_id: number;
  product_id: number;
  createdAt?: Date; // הוספת שדה תאריך יצירה
  updatedAt?: Date; // הוספת שדה תאריך עדכון
}

interface CartCreationAttributes
  extends Optional<CartItemAttributes, "cart_Item_id"> {}

class CartItem
  extends Model<CartItemAttributes, CartCreationAttributes>
  implements CartItemAttributes
{
  public cart_Item_id!: number;
  // public customer_id!: number;
  public product_id!: number;
  public createdAt!: Date; // הוספת שדה תאריך יצירה
  public updatedAt!: Date; // הוספת שדה תאריך עדכון
  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

CartItem.init(
  {
    cart_Item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    // customer_id: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false,
    //   references: {
    //     model: "users",
    //     key: "user_id",
    //   },
    // },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.DATE, // סוג הנתונים הוא תאריך
      allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
    updatedAt: {
      type: DataTypes.DATE, // סוג הנתונים הוא תאריך
      allowNull: false, // מומלץ להוסיף כדי לוודא שהעמודה לא תהיה null
    },
  },
  {
    tableName: "cart_items",
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default CartItem;
