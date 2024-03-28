import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

interface DealAttributes {
  deal_id: number;
  cart_id: number;
  customer_id: number;
  agent_id?: number;
}

interface DealCreationAttributes extends Optional<DealAttributes, "deal_id"> {}

class Deal
  extends Model<DealAttributes, DealCreationAttributes>
  implements DealAttributes
{
  public deal_id!: number;
  public cart_id!: number;
  public customer_id!: number;
  public agent_id!: number;

  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

Deal.init(
  {
    deal_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true, references: {
        model: "carts",
        key: "cart_id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    agent_id: {

      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    tableName: "deals",
    timestamps: false,
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default Deal;
