import { User, UserRelationship } from "../module";
import { UserAttributes } from "../module/User";
import { UserRelationshipAttributes } from "../module/UserRelationship";


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
   const newUser = await User.create(user)
   return newUser;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};

export const createRelationShip = async (newRelationShipInfo: UserRelationshipAttributes) => {
  try {
   const newRelationShip = await UserRelationship.create(newRelationShipInfo)
   return newRelationShip;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};


