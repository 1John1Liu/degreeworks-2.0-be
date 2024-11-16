const express = require('express');
const router = express.Router();
const db = require('../utility/db');

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
