import { User, UserRelationship } from "../module";
import { UserAttributes } from "../module/User";
import { UserRelationshipAttributes } from "../module/UserRelationship";
import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    console.log(users);
    return users;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

export const getUser = async (user_id: string) => {
  try {
    const user = await User.findByPk(user_id);
    console.log(user);
    return user;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

export const createUser = async (user: UserAttributes) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};

export const createRelationShip = async (
  newRelationShipInfo: UserRelationshipAttributes
) => {
  try {
    const newRelationShip = await UserRelationship.create(newRelationShipInfo);
    return newRelationShip;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { query } = req.query as { query?: string };
  if (!query) {
    return res.status(400).send("Query parameter is required");
  }
  const whereCondition: WhereOptions = {
    [Op.or]: [
      { user_id: { [Op.like]: `%${query}%` } },
      { user_name: { [Op.like]: `%${query}%` } },
    ],
  };

  try {
    const users: User[] = await User.findAll({
      where: whereCondition,
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};
