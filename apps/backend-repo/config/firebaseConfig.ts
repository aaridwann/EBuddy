import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

/**
 * Get firebase service account key
 */
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error('SERVICE_ACCOUNT_KEY is not set in .env file');
}

const absolutePath = path.resolve(__dirname, serviceAccountPath);

if (!fs.existsSync(absolutePath)) {
  throw new Error(`Service account file not found: ${absolutePath}`);
}

/**
 * Parse service account key
 */
const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));

/**
 * Initialize app use credential service account
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { db };
