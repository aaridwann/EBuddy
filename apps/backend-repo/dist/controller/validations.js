"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    uid: joi_1.default.string().required(),
    displayName: joi_1.default.string().min(3).max(100).required(),
    email: joi_1.default.string().email().required(),
    photoURL: joi_1.default.string().max(100).allow('').optional(),
});
