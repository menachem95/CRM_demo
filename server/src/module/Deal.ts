import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

interface DealAttributes {
  deal_id: number;
  cart_id: number;
  customer_id: number;
  agent_id?: number;
  inProgress?: boolean;
  status?: boolean;
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
  public inProgress?: boolean;
  public status?: boolean;

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
      primaryKey: true,
      references: {
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
      allowNull: true,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "deals",
    timestamps: false,
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default Deal;
