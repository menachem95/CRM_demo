import sequelize from "../config/config";
import { Cart, Deal } from "../module";


export const getAllCarts = async () => {
  try {
    const carts = await Cart.findAll();
    console.log(carts);
    return carts;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

export const createCart = async (customer_id: number) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const cart = await Cart.create({ customer_id }, { transaction: t });
      console.log(cart);
      const cart_id  = cart.dataValues.cart_id;
      console.log("//////////////////////////////////////////////////////////*")
      console.log("cart_id: ",cart_id)
      await Deal.create({ cart_id, customer_id });
      return cart;
    });
    return result;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};
