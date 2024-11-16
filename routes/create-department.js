const express = require('express');
const router = express.Router();
const db = require('../utility/db');

router.post('/', async (req, res) => {
  const { department_title, department_head } = req.body;

  try {
    await db.query(
      'SELECT create_department($1, $2)',
      [department_title, department_head]
    );
    res.status(201).send('Department created successfully');
  } catch (error) {
    console.error('Error creating departmentdepartment_head:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;