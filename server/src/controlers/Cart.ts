import sequelize from "../config/config";
import { Cart, CartItem, Deal } from "../module";

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
  const result = await sequelize.transaction(async (t) => {
    const cart = await Cart.create({ customer_id }, { transaction: t });
    console.log(cart);
    const cart_id = cart.dataValues.cart_id;
    console.log("//////////////////////////////////////////////////////////*");
    console.log("cart_id: ", cart_id);
    const deal = await Deal.create(
      { cart_id, customer_id },
      { transaction: t }
    );
    return cart;
  });
  return result;
};

export const removeCart = async (cart_id: number) => {
  const result = await sequelize.transaction(async (t) => {
    // await Cart.destroy({ where: { cart_id }});
    await Deal.destroy({ where: { cart_id } });
    await Cart.destroy({
      where: {
        cart_id,
      },
      transaction: t, // שילוב הטרנזקציה באובייקט האופציות
    });
    await Deal.destroy({ where: { cart_id }, transaction: t });
    await CartItem.destroy({ where: { cart_id }, transaction: t });
  });
  return result;
};
