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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserData = exports.updateUserData = exports.fetchUserData = exports.throwUnAuthorized = void 0;
const lodash_1 = require("lodash");
const userCollection_1 = require("../repository/userCollection");
const utils_1 = require("../utils");
const validations_1 = require("./validations");
/**
 * Throw unauthorize response handler
 * @param {Response} res - Response function from express
 * @returns {void} - Throw unauthorize response handler
 */
const throwUnAuthorized = (res) => res.status(401).json((0, utils_1.generateResponse)(false, { code: 'UNAUTHORIZED', message: 'Unauthorized' }));
exports.throwUnAuthorized = throwUnAuthorized;
/**
 * Fetch user data controller
 * @param {Request} req - Request function from express
 * @param {Response} res - Response function from express
 * @returns {Promise<Response>} - Fetch user data controller
 */
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, lodash_1.get)(req, 'user.uid');
        if (!userId) {
            return (0, exports.throwUnAuthorized)(res);
        }
        const user = yield (0, userCollection_1.getUserById)(userId);
        return user
            ? res.status(200).json(user)
            : res.status(404).json((0, utils_1.generateResponse)(false, { code: 'USER_NOT_FOUND', message: 'User not found' }));
    }
    catch (_error) {
        return res.status(500).json((0, utils_1.generateResponse)(false, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' }));
    }
});
exports.fetchUserData = fetchUserData;
/**
 * Update user data controller
 * @param {Request} req - Request function from express
 * @param {Response} res - Response function from express
 * @returns {Promise<Response>} - Update user data controller
 */
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, lodash_1.get)(req, 'user.uid');
        if (!userId) {
            return (0, exports.throwUnAuthorized)(res);
        }
        const { error, value } = validations_1.userSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json((0, utils_1.generateResponse)(false, {
                code: 'VALIDATION_ERROR',
                message: `'Validation Error ${error.details.map((err) => err.message)}`,
            }));
        }
        const user = yield (0, userCollection_1.updateUser)(userId, value);
        return res.status(201).json(user);
    }
    catch (_error) {
        return res.status(500).json((0, utils_1.generateResponse)(false, { code: 'FAILED_UPDATE_USER', message: 'Failed update user' }));
    }
});
exports.updateUserData = updateUserData;
/**
 * Create user data
 * @param {Request} req - Request method
 * @param {Response} res - Response method
 * @returns {Promise<Response>} - Create user data
 */
const createUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, lodash_1.get)(req, 'user.uid');
        if (!userId) {
            return (0, exports.throwUnAuthorized)(res);
        }
        const user = yield (0, userCollection_1.createUser)(Object.assign({ uid: userId }, req.body));
        return res.status(201).json(user);
    }
    catch (_error) {
        return res.status(500).json((0, utils_1.generateResponse)(false, { code: 'FAILED_CREATE_USER', message: 'Failed to create user' }));
    }
});
exports.createUserData = createUserData;
