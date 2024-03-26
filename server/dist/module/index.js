"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelationship = exports.CartItem = exports.Deal = exports.User = exports.Cart = exports.Product = void 0;
const Product_1 = __importDefault(require("./Product"));
exports.Product = Product_1.default;
const Cart_1 = __importDefault(require("./Cart"));
exports.Cart = Cart_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Deal_1 = __importDefault(require("./Deal"));
exports.Deal = Deal_1.default;
const CartItem_1 = __importDefault(require("./CartItem"));
exports.CartItem = CartItem_1.default;
const UserRelationship_1 = __importDefault(require("./UserRelationship"));
exports.UserRelationship = UserRelationship_1.default;
// //שיוך לקוח לעגלה
// User.hasMany(Cart, { foreignKey: 'user_id', as: 'carts' });
// Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// סוכנים והלקוחות שלהם
User_1.default.hasMany(UserRelationship_1.default, { foreignKey: 'agent_id', as: 'clients' });
UserRelationship_1.default.belongsTo(User_1.default, { foreignKey: 'agent_id', as: 'agent' });
// לקוחות והסוכנים שלהם
User_1.default.hasMany(UserRelationship_1.default, { foreignKey: 'customer_id', as: 'agents' });
UserRelationship_1.default.belongsTo(User_1.default, { foreignKey: 'customer_id', as: 'customer' });
//עגלה ומוצרים למשתמש
Cart_1.default.hasMany(CartItem_1.default, { foreignKey: 'cart_Id' });
CartItem_1.default.belongsTo(Cart_1.default, { foreignKey: 'cart_Item_id' });
Product_1.default.hasMany(CartItem_1.default, { foreignKey: 'productId' });
CartItem_1.default.belongsTo(Product_1.default, { foreignKey: 'productId' });
Deal_1.default.belongsTo(Cart_1.default, { foreignKey: 'cart_id' });
Cart_1.default.hasOne(Deal_1.default, { foreignKey: 'cart_id' });
User_1.default.hasMany(Deal_1.default, { foreignKey: 'customer_id' });
Deal_1.default.belongsTo(User_1.default, { foreignKey: 'customer_id', as: 'customer' });
// קשר לסוכן
User_1.default.hasMany(Deal_1.default, { foreignKey: 'agent_id' });
Deal_1.default.belongsTo(User_1.default, { foreignKey: 'agent_id', as: 'agent' });
