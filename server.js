const express = require('express');
require('dotenv').config();

const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('CSE 341 Contacts API is running!');
});

app.use('/contacts', require('./routes/contacts'));

// Initialize MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB');
    console.error('Error details:', err);
    process.exit(1);
  } else {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});