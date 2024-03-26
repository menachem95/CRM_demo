import Product from "./Product";
import Cart from "./Cart";
import User from "./User";
import Deal from "./Deal";
import CartItem from "./CartItem";
import UserRelationship from "./UserRelationship";


// //שיוך לקוח לעגלה
// User.hasMany(Cart, { foreignKey: 'user_id', as: 'carts' });
// Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });


// סוכנים והלקוחות שלהם
User.hasMany(UserRelationship, { foreignKey: 'agent_id', as: 'clients' });
UserRelationship.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });

// לקוחות והסוכנים שלהם
User.hasMany(UserRelationship, { foreignKey: 'customer_id', as: 'agents' });
UserRelationship.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });


//עגלה ומוצרים למשתמש
Cart.hasMany(CartItem, { foreignKey: 'cart_Id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_Item_id' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Deal.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasOne(Deal, { foreignKey: 'cart_id' });

User.hasMany(Deal, { foreignKey: 'customer_id' });
Deal.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });

// קשר לסוכן
User.hasMany(Deal, { foreignKey: 'agent_id' });
Deal.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });


export { Product, Cart, User, Deal, CartItem, UserRelationship };
