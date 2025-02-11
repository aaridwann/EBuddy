"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
jest.mock('../utils', () => ({
    generateResponse: jest.fn((success, payload) => (Object.assign({ success }, payload))),
}));
describe('Error Handlers', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe('notFoundHandler', () => {
        it('should return 404 with "Route not found" message', () => {
            (0, errorHandler_1.notFoundHandler)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'ERROR_ROUTE_NOT_FOUND',
                message: 'Route not found',
            });
        });
    });
    describe('errorHandler', () => {
        it('should return 500 with "Internal Server Error" message', () => {
            const error = new Error('Unexpected error');
            (0, errorHandler_1.errorHandler)(error, req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                code: 'ERROR_INTERNAL_SEVER_ERROR',
                message: 'Internal Server Error',
            });
        });
    });
});
