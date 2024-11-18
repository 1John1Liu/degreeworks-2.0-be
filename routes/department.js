const express = require('express');
const router = express.Router();
const db = require('../utility/db');

// Route to create a department
router.post('/', async (req, res) => {
  const { department_title, department_head } = req.body;

  try {
    await db.query('SELECT create_department($1, $2)', [
      department_title,
      department_head,
    ]);
    res.status(201).send('Department created successfully');
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a department
router.delete('/:department_id', async (req, res) => {
  const { department_id } = req.params;

  try {
    await db.query('SELECT delete_department($1)', [department_id]);
    res.status(200).send('Department deleted successfully');
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
