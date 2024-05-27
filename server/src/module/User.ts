import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";
import Deal from "./Deal";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Meeting from "./Meeting";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

export interface UserAttributes {
  user_id: number;
  user_role: "AGENT" | "CUSTOMER";
  user_name: string;
  user_email: string;
  user_password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public user_id!: number;
  public user_role!: "AGENT" | "CUSTOMER";
  public user_name!: string;
  public user_email!: string;
  public user_password!: string;

  static async authenticate(email: string, password: string) {
    const user = await User.findOne({ where: { user_email: email } });
    console.log("user: ", user);
    if (!user) {
      throw new Error("Invalid username");
    }

    const isValid = await bcrypt.compare(password, user.user_password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { user, token };
  }

  static async getCurrentCartInProgres(customer_id: number) {
    const deal = await Deal.findOne({
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
    } else {
      const cart_id = deal!.cart_id;
      const items = await Cart.getItemsForCart(+cart_id);
      console.log("items: ", items);
      return { cart_id, items };
    }
  }

  static async getMyMeetings(user_id: number, user_role: string) {
    let meetings;
    if (user_role === "AGENT") {
      meetings = await Meeting.findAll({
        where: {
          agent_id: user_id,
        },
      });
    } else if (user_role === "CUSTOMER") {
      meetings = await Meeting.findAll({
        where: {
          customer_id: user_id,
        },
      });
    }
    return meetings;
  }

  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_role: {
      type: DataTypes.ENUM("AGENT", "CUSTOMER"),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default User;

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
