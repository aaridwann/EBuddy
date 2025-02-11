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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const utils_1 = require("../utils");
const authMiddleware_1 = require("./authMiddleware");
jest.mock('firebase-admin', () => ({
    auth: jest.fn().mockReturnValue({
        verifyIdToken: jest.fn(),
    }),
}));
describe('authMiddleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });
    it('should return 401 when token is missing and BYPASS_AUTH is not set', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith((0, utils_1.generateResponse)(false, { code: 'UNAUTHORIZED', message: 'Unauthorized' }));
        expect(next).not.toHaveBeenCalled();
    }));
    it('should call next() when token is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.BYPASS_AUTH = '';
        req.headers = { authorization: 'Bearer validToken' };
        firebase_admin_1.default.auth().verifyIdToken.mockResolvedValue({
            uid: '123',
            email: 'user@test.com',
        });
        yield (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(firebase_admin_1.default.auth().verifyIdToken).toHaveBeenCalledWith('validToken');
        expect(req.user).toEqual({ uid: '123', email: 'user@test.com' });
        expect(next).toHaveBeenCalled();
    }));
    it('should return 401 when token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.BYPASS_AUTH = '';
        req.headers = { authorization: 'Bearer invalidToken' };
        firebase_admin_1.default.auth().verifyIdToken.mockRejectedValue(new Error('Invalid token'));
        yield (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith((0, utils_1.generateResponse)(false, { code: 'INVALID_TOKEN', message: 'Invalid token' }));
        expect(next).not.toHaveBeenCalled();
    }));
});
