"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelationShip = exports.createUser = exports.getAllUsers = void 0;
const module_1 = require("../module");
const getAllUsers = async () => {
    try {
        const users = await module_1.User.findAll();
        console.log(users);
        return users;
    }
    catch (error) {
        console.error("error:", error);
        return error;
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (user) => {
    try {
        const newUser = await module_1.User.create(user);
        return newUser;
    }
    catch (error) {
        console.error("error: ", error);
        return error;
    }
};
exports.createUser = createUser;
const createRelationShip = async (newRelationShipInfo) => {
    try {
        const newRelationShip = await module_1.UserRelationship.create(newRelationShipInfo);
        return newRelationShip;
    }
    catch (error) {
        console.error("error: ", error);
        return error;
    }
};
exports.createRelationShip = createRelationShip;
