import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

import { notFoundHandler, errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';

dotenv.config();

// Inisialisasi Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Initial Express
 */
const app = express();

/**
 * Enable CORS only for http://localhost:3002
 */
app.use(
  cors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

/**
 * Use Attribute
 */
app.use(express.json());
app.use('/', userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
