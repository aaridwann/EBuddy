require('dotenv').config();
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

const app = require('../dist/core/app').default;

exports.api = onRequest(app);
exports.helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
