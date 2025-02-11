"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
/**
 * Generate Response
 * @param success
 * @param dataOrError
 * @returns
 */
const generateResponse = (success, dataOrError) => {
    if (success) {
        return {
            success: true,
            data: dataOrError,
        };
    }
    return {
        success: false,
        error: {
            code: dataOrError.code || 500,
            message: dataOrError.message || 'Unknown error',
        },
    };
};
exports.generateResponse = generateResponse;
