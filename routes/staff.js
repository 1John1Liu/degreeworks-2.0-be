const express = require('express');
const router = express.Router();
const db = require('../utility/db');

// Route to create a staff member
router.post('/', async (req, res) => {
  const { department_ID, date_hired, SSN, birth_date, first_name, last_name, email, phone, pass_hash } = req.body;

  try {
    // Check if the staff already exists (based on SSN)
    const checkStaffQuery = `
      SELECT staff_ID 
      FROM Staff 
      WHERE SSN = $1
    `;
    const existingStaff = await db.query(checkStaffQuery, [SSN]);

    if (existingStaff.rows.length > 0) {
      return res.status(409).send('Staff member with this SSN already exists');
    }

    // Check if the department ID exists
    const checkDepartmentQuery = `
      SELECT department_ID
      FROM Department 
      WHERE department_ID = $1
    `;
    const departmentExists = await db.query(checkDepartmentQuery, [department_ID]);

    if (departmentExists.rows.length === 0) {
      return res.status(400).send('Invalid department ID');
    }

    // Call the create_staff function
    await db.query('SELECT create_staff($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
      department_ID,
      date_hired,
      SSN,
      birth_date,
      first_name,
      last_name,
      email,
      phone,
      pass_hash,
    ]);

    res.status(201).send('Staff member created successfully');
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a staff member
router.delete('/:staff_id', async (req, res) => {
  const { staff_id } = req.params;

  try {
    // Call the delete_staff function
    await db.query('SELECT delete_staff($1)', [staff_id]);
    res.status(200).send('Staff member deleted successfully');
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
