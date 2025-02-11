"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
/**
 * Auth middleware
 * @param {Request} req - Request method from express
 * @param {Request} res - Response method from express
 * @param {NextFunction} next - Next method from express
 * @returns {Promise<void>} - Auth middleware
 */
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = lodash_1.default.get(req.headers, 'authorization', '').split('Bearer ')[1];
        if (!token && !process.env.BYPASS_AUTH) {
            res.status(401).json((0, utils_1.generateResponse)(false, { code: 'UNAUTHORIZED', message: 'Unauthorized' }));
            return;
        }
        const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (_error) {
        res.status(401).json((0, utils_1.generateResponse)(false, { code: 'INVALID_TOKEN', message: 'Invalid token' }));
    }
});
exports.authMiddleware = authMiddleware;
