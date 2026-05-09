const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Database is already initialized');
    return callback(null, db);
  }

  console.log('🔄 Trying to connect to MongoDB Atlas...');

  MongoClient.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
  })
    .then((client) => {
      db = client;
      console.log('Successfully connected to MongoDB');
      callback(null, db);
    })
    .catch((err) => {
      console.error('MongoDB Connection Error');
      console.error('Error Message:', err.message);
      console.error('Error Name:', err.name);
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { initDb, getDb };