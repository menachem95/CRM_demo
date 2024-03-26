import { Model, DataTypes } from "sequelize";
import sequelize from "../config/config";

export interface UserRelationshipAttributes {
  customer_id: number;
  agent_id: number;
}

interface UserRelationshipCreationAttributes
  extends UserRelationshipAttributes {}

class UserRelationship
  extends Model<UserRelationshipAttributes, UserRelationshipCreationAttributes>
  implements UserRelationshipAttributes
{
  public customer_id!: number;
  public agent_id!: number;

  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

UserRelationship.init(
  {
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    agent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    tableName: "user_relationships",
    sequelize, // העברת ה-instance של Sequelize
  }
);

export default UserRelationship;


