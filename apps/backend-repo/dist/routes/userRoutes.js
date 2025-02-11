"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
const constans_1 = __importDefault(require("../constans"));
const { PATH_NAME: { FETCH_USER, UPDATE_USER, CREATE_USER }, } = constans_1.default;
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.get(FETCH_USER, authMiddleware_1.authMiddleware, asyncHandler(api_1.fetchUserData));
router.put(UPDATE_USER, authMiddleware_1.authMiddleware, asyncHandler(api_1.updateUserData));
router.post(CREATE_USER, authMiddleware_1.authMiddleware, asyncHandler(api_1.createUserData));
exports.default = router;
