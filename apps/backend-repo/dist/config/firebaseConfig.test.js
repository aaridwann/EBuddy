"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
jest.mock('firebase-admin', () => ({
    initializeApp: jest.fn(),
    credential: {
        cert: jest.fn(),
    },
    firestore: jest.fn(() => ({
        collection: jest.fn(),
    })),
}));
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
}));
jest.mock('path', () => ({
    resolve: jest.fn(() => '/mock/path/serviceAccount.json'),
}));
jest.mock('dotenv', () => ({
    config: jest.fn(),
}));
describe('Firebase Admin Initialization', () => {
    const envBackup = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = Object.assign(Object.assign({}, envBackup), { SERVICE_ACCOUNT_KEY: 'mock/serviceAccount.json' });
    });
    afterEach(() => {
        process.env = envBackup;
        jest.clearAllMocks();
    });
    //   it('should initialize Firebase when service account file exists', () => {
    //     (fs.existsSync as jest.Mock).mockReturnValue(true);
    //     (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ project_id: 'mock-project' }));
    //     require('./firebaseConfig'); // Import ulang setelah mock
    //     expect(path.resolve).toHaveBeenCalledWith(__dirname, 'mock/serviceAccount.json');
    //     expect(fs.existsSync).toHaveBeenCalledWith('/mock/path/serviceAccount.json');
    //     expect(fs.readFileSync).toHaveBeenCalledWith('/mock/path/serviceAccount.json', 'utf-8');
    //     expect(admin.credential.cert).toHaveBeenCalledWith({ project_id: 'mock-project' });
    //     expect(admin.initializeApp).toHaveBeenCalled();
    //   });
    it('should throw an error if SERVICE_ACCOUNT_KEY is not set', () => {
        delete process.env.SERVICE_ACCOUNT_KEY;
        expect(() => require('./firebaseConfig')).toThrow('SERVICE_ACCOUNT_KEY is not set in .env file');
    });
    it('should throw an error if service account file does not exist', () => {
        fs_1.default.existsSync.mockReturnValue(false);
        expect(() => require('./firebaseConfig')).toThrow('Service account file not found: /mock/path/serviceAccount.json');
    });
    it('should throw an error if service account file is invalid JSON', () => {
        fs_1.default.existsSync.mockReturnValue(true);
        fs_1.default.readFileSync.mockReturnValue('invalid json');
        expect(() => require('./firebaseConfig')).toThrow();
    });
});
