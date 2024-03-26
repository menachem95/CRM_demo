import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

export interface ProductAttributes {
  product_id: number;
  product_name: string;
  product_price: number;
  product_description: string;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "product_id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public product_id!: number;
  public product_name!: string;
  public product_price!: number;
  public product_description!: string;

  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: new DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    product_description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    product_price: {
      type: new DataTypes.DECIMAL().UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default Product;

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
