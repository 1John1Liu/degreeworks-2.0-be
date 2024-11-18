const express = require('express');
const router = express.Router();
const db = require('../utility/db');
const degree_types = require('../utility/degree_types');

router.post('/', async (req, res) => {
  const { major_title, department_ID, total_hours, degree_type } = req.body;

  try {
    if (!degree_types.includes(degree_type)) {
      return res.status(400).send('Invalid degree type');
    }

    const checkQuery = `
      SELECT major_title 
      FROM Major 
      WHERE LOWER(major_title) = LOWER($1)
    `;
    const existingMajor = await db.query(checkQuery, [major_title]);

    if (existingMajor.rows.length > 0) {
      return res.status(409).send('Major title already exists');
    }

    await db.query('SELECT create_major($1, $2, $3, $4)', [
      major_title,
      department_ID,
      total_hours,
      degree_type,
    ]);

    res.status(201).send('Major created successfully');
  } catch (error) {
    console.error('Error creating major:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a major
router.delete('/', async (req, res) => {
  const { major_title } = req.body;

  if (!major_title) {
    return res.status(400).send('Major title is required');
  }

  try {
    const deleteQuery = `
      SELECT delete_major($1)
    `;

    await db.query(deleteQuery, [major_title]);
    res.status(200).send('Major deleted successfully');
  } catch (error) {
    console.error('Error deleting major:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
