const express = require('express');
const router = express.Router();
const db = require('../utility/db');

// Route to create an instructor
router.post('/', async (req, res) => {
  const { department_ID, date_hired, SSN, birth_date, first_name, last_name, email, phone, pass_hash } = req.body;

  try {
    // Check if the instructor already exists (based on SSN)
    const checkInstructorQuery = `
      SELECT instructor_ID 
      FROM Instructor 
      WHERE SSN = $1
    `;
    const existingInstructor = await db.query(checkInstructorQuery, [SSN]);

    if (existingInstructor.rows.length > 0) {
      return res.status(409).send('Instructor with this SSN already exists');
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

    // Call the create_instructor function
    await db.query('SELECT create_instructor($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
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
    
    res.status(201).send('Instructor created successfully');
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete an instructor
router.delete('/:instructor_id', async (req, res) => {
    const { instructor_id } = req.params;
  
    try {
        await db.query('SELECT delete_instructor($1)', [instructor_id]);
        res.status(200).send('Instructor deleted successfully');
    } catch (error) {
        console.error('Error deleting instructor:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
