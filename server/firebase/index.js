const admin = require('firebase-admin');

const serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-shop-31028.firebaseio.com',
});

module.exports = admin;
