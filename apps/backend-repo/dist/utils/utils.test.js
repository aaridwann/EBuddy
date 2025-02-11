"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('generateResponse', () => {
    it('should return success response when success is true', () => {
        const data = { id: 1, name: 'Test' };
        const result = (0, _1.generateResponse)(true, data);
        expect(result).toEqual({
            success: true,
            data,
        });
    });
    it('should return error response with given code and message when success is false', () => {
        const error = { code: 400, message: 'Bad Request' };
        const result = (0, _1.generateResponse)(false, error);
        expect(result).toEqual({
            success: false,
            error: {
                code: 400,
                message: 'Bad Request',
            },
        });
    });
    it('should return default error response when success is false and no code/message provided', () => {
        const error = {};
        const result = (0, _1.generateResponse)(false, error);
        expect(result).toEqual({
            success: false,
            error: {
                code: 500,
                message: 'Unknown error',
            },
        });
    });
});
