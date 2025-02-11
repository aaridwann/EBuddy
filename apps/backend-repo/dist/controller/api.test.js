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
const api_1 = require("../controller/api");
const userCollection_1 = require("../repository/userCollection");
const validations_1 = require("../controller/validations");
jest.mock('../repository/userCollection.ts', () => ({
    getUserById: jest.fn(),
    updateUser: jest.fn(),
}));
jest.mock('../utils', () => ({
    generateResponse: jest.fn((success, payload) => (Object.assign({ success }, payload))),
}));
jest.mock('../controller/validations.ts', () => ({
    userSchema: {
        validate: jest.fn(),
    },
}));
describe('User Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = { user: { uid: 'abc123' }, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe('fetchUserData', () => {
        it('should return user data if user exists', () => __awaiter(void 0, void 0, void 0, function* () {
            userCollection_1.getUserById.mockResolvedValue({ id: 'abc123', email: 'user@example.com' });
            yield (0, api_1.fetchUserData)(req, res);
            expect(userCollection_1.getUserById).toHaveBeenCalledWith('abc123');
            expect(res.json).toHaveBeenCalledWith({ id: 'abc123', email: 'user@example.com' });
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            userCollection_1.getUserById.mockResolvedValue(null);
            yield (0, api_1.fetchUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'USER_NOT_FOUND',
                message: 'User not found',
            });
        }));
        it('should return 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            req.user = undefined;
            yield (0, api_1.fetchUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'UNAUTHORIZED',
                message: 'Unauthorized',
            });
        }));
        it('should return 500 on error', () => __awaiter(void 0, void 0, void 0, function* () {
            userCollection_1.getUserById.mockRejectedValue(new Error('DB Error'));
            yield (0, api_1.fetchUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error',
            });
        }));
    });
    describe('updateUserData', () => {
        it('should return updated user data on success', () => __awaiter(void 0, void 0, void 0, function* () {
            validations_1.userSchema.validate.mockReturnValue({ error: null, value: { email: 'new@example.com' } });
            userCollection_1.updateUser.mockResolvedValue({ id: 'abc123', email: 'new@example.com' });
            yield (0, api_1.updateUserData)(req, res);
            expect(userCollection_1.updateUser).toHaveBeenCalledWith('abc123', { email: 'new@example.com' });
            expect(res.json).toHaveBeenCalledWith({ id: 'abc123', email: 'new@example.com' });
        }));
        it('should return 400 if validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            validations_1.userSchema.validate.mockReturnValue({
                error: { details: [{ message: 'Email is required' }] },
            });
            yield (0, api_1.updateUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'VALIDATION_ERROR',
                message: "'Validation Error Email is required",
            });
        }));
        it('should return 401 if user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            req.user = undefined;
            yield (0, api_1.updateUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'UNAUTHORIZED',
                message: 'Unauthorized',
            });
        }));
        it('should return 500 if update fails', () => __awaiter(void 0, void 0, void 0, function* () {
            validations_1.userSchema.validate.mockReturnValue({ error: null, value: { email: 'new@example.com' } });
            userCollection_1.updateUser.mockRejectedValue(new Error('DB Error'));
            yield (0, api_1.updateUserData)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'FAILED_UPDATE_USER',
                message: 'Failed update user',
            });
        }));
    });
});
