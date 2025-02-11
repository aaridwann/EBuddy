'use strict';
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true });
const firebaseConfig_1 = require('../config/firebaseConfig');

const userMock_1 = require('./userMock');
const userCollection_1 = require('./userCollection');
jest.mock('../config/firebaseConfig', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        update: jest.fn(),
        set: jest.fn(),
      })),
    })),
  },
}));
describe('User Collection Service', () => {
  const usersCollection = firebaseConfig_1.db.collection('users');
  const userDoc = usersCollection.doc(userMock_1.mockUser.uid);
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('getUserById should return user if found', () => __awaiter(void 0, void 0, void 0, function* () {
    userDoc.get.mockResolvedValue({ exists: true, id: userMock_1.mockUser.uid, data: () => userMock_1.mockUser });
    const result = yield (0, userCollection_1.getUserById)(userMock_1.mockUser.uid);
    expect(result).toEqual(Object.assign({ id: userMock_1.mockUser.uid }, userMock_1.mockUser));
    expect(userDoc.get).toHaveBeenCalled();
  }));
  test('getUserById should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
    userDoc.get.mockResolvedValue({ exists: false });
    const result = yield (0, userCollection_1.getUserById)('nonexistent-id');
    expect(result).toBeNull();
  }));
  test('updateUser should update and return updated user', () => __awaiter(void 0, void 0, void 0, function* () {
    userDoc.update.mockResolvedValue();
    userDoc.get.mockResolvedValue({ exists: true, id: userMock_1.mockUser.uid, data: () => userMock_1.mockUser });
    const result = yield (0, userCollection_1.updateUser)(userMock_1.mockUser.uid, { displayName: 'Updated Name' });
    expect(userDoc.update).toHaveBeenCalledWith({ displayName: 'Updated Name' });
    expect(result).toEqual(Object.assign({ id: userMock_1.mockUser.uid }, userMock_1.mockUser));
  }));
  test('createUser should add a user and return it', () => __awaiter(void 0, void 0, void 0, function* () {
    userDoc.set.mockResolvedValue();
    userDoc.get.mockResolvedValue({ exists: true, id: userMock_1.mockUser.uid, data: () => userMock_1.mockUser });
    const result = yield (0, userCollection_1.createUser)(userMock_1.mockUser);
    expect(userDoc.set).toHaveBeenCalledWith(userMock_1.mockUser);
    expect(result).toEqual(Object.assign({ id: userMock_1.mockUser.uid }, userMock_1.mockUser));
  }));
});
