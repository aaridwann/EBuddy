'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.mockUpdatedUser = exports.mockUser = void 0;
exports.mockUser = {
  uid: '12345',
  email: 'testuser@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
  phoneNumber: '+62123456789',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
exports.mockUpdatedUser = Object.assign(Object.assign({}, exports.mockUser), { displayName: 'Updated User', updatedAt: new Date().toISOString() });
