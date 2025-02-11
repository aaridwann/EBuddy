"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const utils_1 = require("../utils");
/**
 * Not found handler utils
 * @param {Request} req - Request method from express
 * @param {Response} res - Response method from express
 * @return {void} - Not found handler utils
 */
const notFoundHandler = (req, res) => {
    res.status(404).json((0, utils_1.generateResponse)(false, { code: 'ERROR_ROUTE_NOT_FOUND', message: 'Route not found' }));
};
exports.notFoundHandler = notFoundHandler;
/**
 * Error handler utils
 * @param {Request} req - Request method from express
 * @param {Response} res - Response method from express
 * @return {void} - Error handler utils
 */
const errorHandler = (err, req, res) => {
    res.status(500).json((0, utils_1.generateResponse)(false, { code: 'ERROR_INTERNAL_SEVER_ERROR', message: 'Internal Server Error' }));
};
exports.errorHandler = errorHandler;
