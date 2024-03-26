import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

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
