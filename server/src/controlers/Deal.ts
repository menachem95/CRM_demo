import sequelize from "../config/config";
import { Cart, Deal } from "../module";


export const getAllDeals = async () => {
  try {
    const carts = await Deal.findAll();
    console.log(carts);
    return carts;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

