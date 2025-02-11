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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const constans_1 = __importDefault(require("../constans"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
// Mock Middleware
jest.mock('../middleware/authMiddleware.ts', () => ({
    authMiddleware: (req, res, next) => next(),
}));
// Mock Controller
jest.mock('../controller/api.ts', () => ({
    fetchUserData: jest.fn((req, res) => res.json({ id: '123', name: 'John Doe' })),
    updateUserData: jest.fn((req, res) => res.json({ success: true })),
}));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(userRoutes_1.default);
const { PATH_NAME: { FETCH_USER, UPDATE_USER }, } = constans_1.default;
describe('API Routes', () => {
    it('should fetch user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(FETCH_USER);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '123', name: 'John Doe' });
    }));
    it('should update user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(UPDATE_USER)
            .send({ name: 'Updated Name' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
    }));
});
