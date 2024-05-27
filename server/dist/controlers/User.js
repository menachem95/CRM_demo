"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createRelationShip = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const module_1 = require("../module");
const sequelize_1 = require("sequelize");
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
const getUser = async (user_id) => {
    try {
        const user = await module_1.User.findByPk(user_id);
        console.log(user);
        return user;
    }
    catch (error) {
        console.error("error:", error);
        return error;
    }
};
exports.getUser = getUser;
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
const getUsers = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send("Query parameter is required");
    }
    const whereCondition = {
        [sequelize_1.Op.or]: [
            { user_id: { [sequelize_1.Op.like]: `%${query}%` } },
            { user_name: { [sequelize_1.Op.like]: `%${query}%` } },
        ],
    };
    try {
        const users = await module_1.User.findAll({
            where: whereCondition,
        });
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
};
exports.getUsers = getUsers;
