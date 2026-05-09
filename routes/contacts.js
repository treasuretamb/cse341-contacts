const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.db('cse341').collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contactId = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }

    const contact = await db
      .db('cse341')
      .collection('contacts')
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;