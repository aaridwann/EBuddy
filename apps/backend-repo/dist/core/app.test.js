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
const routes_1 = __importDefault(require("../routes"));
const errorHandler_1 = require("../middleware/errorHandler");
jest.mock('../repository/userCollection', () => ({
    getUserById: jest.fn().mockResolvedValue({
        name: 'yuyun',
    }),
}));
describe('Express Server', () => {
    let app;
    beforeEach(() => {
        process.env.BYPASS_AUTH = 'true';
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/', routes_1.default);
        app.use(errorHandler_1.notFoundHandler);
        app.use(errorHandler_1.errorHandler);
    });
    it('should return 404 for unknown routes', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/unknown-route');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            success: false,
            error: { code: 'ERROR_ROUTE_NOT_FOUND', message: 'Route not found' },
        });
    }));
});
