import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import CartItem from "./CartItem";
import Product from "./Product";

 interface CartAttributes {
  cart_id: number;
  customer_id: number;
  // createdAt?: Date; // הוספת שדה תאריך יצירה
  // updatedAt?: Date; // הוספת שדה תאריך עדכון
}

interface CartCreationAttributes extends Optional<CartAttributes, "cart_id"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public cart_id!: number;
  public customer_id!: number;
  
  static async getItemsForCart(cartId: number) {
    const items = await CartItem.findAll({
      where: {
        cart_id: cartId
      },
      include: [{
        model: Product, // ודא שמודל Product מיובא ומוגדר כראוי
        // as: 'product' // 'as' צריך להיות תואם לזה שהוגדר בהגדרת הקשר ב-Sequelize
      }]
    });
    return items
  }
  // public createdAt!: Date; // הוספת שדה תאריך יצירה
  // public updatedAt!: Date; // הוספת שדה תאריך עדכון
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
  },
  {
    tableName: "carts",
    timestamps: false,
    sequelize, // העברת ה-instance של Sequelize
  }
);



export default Cart;

