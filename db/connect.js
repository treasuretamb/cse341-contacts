const { MongoClient } = require('mongodb');

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Database is already initialized');
    return callback(null, db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client;
      console.log('Connected to MongoDB');
      callback(null, db);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
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