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
exports.createUser = exports.updateUser = exports.getUserById = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const usersCollection = firebaseConfig_1.db.collection('users');
/**
 * Get user to collection
 * @param {string} id - Id of user
 * @returns {GetUserType} - Get user to collection
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield usersCollection.doc(id).get();
    return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
});
exports.getUserById = getUserById;
/**
 * Update user to collection
 * @param {string} id - Id of user
 * @param {Partial<User>} data - Data modify from body request
 * @returns {User} - Update user to collection
 */
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield usersCollection.doc(id).update(data);
    return (0, exports.getUserById)(id);
});
exports.updateUser = updateUser;
/**
 * Create new user in collection
 * @param {User} user - User data to be added
 * @returns {User} - Created user data
 */
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = usersCollection.doc(user.uid);
    yield userRef.set(user);
    return (0, exports.getUserById)(user.uid);
});
exports.createUser = createUser;
