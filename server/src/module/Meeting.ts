import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config";

export interface MeetingAttributes {
  meeting_id: number;
  customer_id: number;
  meeting_summary?: string;
  meeting_title: string;
  agent_id?: number;
  inProgress?: boolean;
  status?: boolean;
  meeting_date: string;
}

interface MeetingCreationAttributes
  extends Optional<MeetingAttributes, "meeting_id"> {}

class Meeting
  extends Model<MeetingAttributes, MeetingCreationAttributes>
  implements MeetingAttributes
{
  public meeting_id!: number;
  public customer_id!: number;
  public agent_id!: number;
  public meeting_summary?: string;
  public meeting_title!: string;
  public inProgress?: boolean;
  public status?: boolean;
  public meeting_date!: string;

  // ניתן להוסיף כאן מתודות מופע ומחלקה
}

Meeting.init(
  {
    meeting_id: {
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
    meeting_summary: {
      type: DataTypes.TEXT,
    },
    meeting_title: {
      type: DataTypes.TEXT,
    },
    meeting_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "meetings",
    timestamps: true,
    sequelize,
  }
);

export default Meeting;
