"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class AGENT extends Person_1.default {
    constructor(name, email, phone) {
        super(name, email, phone, "AGENT");
    }
}
exports.default = AGENT;
