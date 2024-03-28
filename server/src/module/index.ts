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


// קשר One-to-Many בין Cart ל-CartItem
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// קשר One-to-Many בין Product ל-CartItem
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

Deal.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasOne(Deal, { foreignKey: 'cart_id' });



User.hasMany(Deal, { foreignKey: 'customer_id' });
Deal.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });

// קשר לסוכן
User.hasMany(Deal, { foreignKey: 'agent_id' });
Deal.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });



export { Product, Cart, User, Deal, CartItem, UserRelationship };
