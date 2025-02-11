'use strict';
const __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) {k2 = k;}
  let desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) {k2 = k;}
  o[k2] = m[k];
}));
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v });
}) : function(o, v) {
  o['default'] = v;
});
const __importStar = (this && this.__importStar) || (function () {
  let ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function (o) {
      const ar = [];
      for (const k in o) {if (Object.prototype.hasOwnProperty.call(o, k)) {ar[ar.length] = k;}}

      return ar;
    };

    return ownKeys(o);
  };

  return function (mod) {
    if (mod && mod.__esModule) {return mod;}
    const result = {};

    if (mod != null) {for (let k = ownKeys(mod), i = 0; i < k.length; i++) {if (k[i] !== 'default') {__createBinding(result, mod, k[i]);}}}
    __setModuleDefault(result, mod);

    return result;
  };
})();
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.api = void 0;
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const firebase_admin_1 = __importDefault(require('firebase-admin'));
const dotenv = __importStar(require('dotenv'));
const https_1 = require('firebase-functions/https');

// import { Functions } from 'firebase-admin/functions';
const functions = __importStar(require('firebase-functions'));
const errorHandler_1 = require('../middleware/errorHandler');
const userRoutes_1 = __importDefault(require('../routes/userRoutes'));
dotenv.config();

// Inisialisasi Firebase Admin SDK
if (!firebase_admin_1.default.apps.length) {
  firebase_admin_1.default.initializeApp();
}
/**
 * Initial Express
 */
const app = (0, express_1.default)();
/**
 * Enable CORS only for http://localhost:3002
 */
app.use((0, cors_1.default)({
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
/**
 * Use Attribute
 */
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Firebase Emulator!' });
});
exports.api = functions.https.onRequest(app);
// const PORT = process.env.PORT_NUMBER || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.api = (0, https_1.onRequest)(app);
// export default app;
