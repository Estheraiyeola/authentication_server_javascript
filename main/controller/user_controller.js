const express = require('express');
const { authenticateUser, createUser } = require('../service/user_service');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const token = await authenticateUser(req.body);
    res.json({ token });
    res.status(200);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
    res.status(201);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
