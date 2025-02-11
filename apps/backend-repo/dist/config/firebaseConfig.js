"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
/**
 * Get firebase service account key
 */
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY;
if (!serviceAccountPath) {
    throw new Error('SERVICE_ACCOUNT_KEY is not set in .env file');
}
const absolutePath = path_1.default.resolve(__dirname, serviceAccountPath);
if (!fs_1.default.existsSync(absolutePath)) {
    throw new Error(`Service account file not found: ${absolutePath}`);
}
/**
 * Parse service account key
 */
const serviceAccount = JSON.parse(fs_1.default.readFileSync(absolutePath, 'utf-8'));
/**
 * Initialize app use credential service account
 */
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const db = firebase_admin_1.default.firestore();
exports.db = db;
