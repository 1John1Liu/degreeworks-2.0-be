const express = require('express');
const router = express.Router();
const db = require('../utility/db');

// Route to create a course
router.post('/', async (req, res) => {
  const { major_title, instructor_ID, course_title, course_prefix, course_number, credit, semester, year, method, days, start_time, end_time, seats_cap, seats_available } = req.body;

  try {
    // Check if the course already exists based on course title and course number
    const checkQuery = `
      SELECT course_title, course_number 
      FROM Course 
      WHERE LOWER(course_title) = LOWER($1) AND course_number = $2
    `;
    const existingCourse = await db.query(checkQuery, [course_title, course_number]);

    if (existingCourse.rows.length > 0) {
      return res.status(409).send('Course already exists');
    }

    // Call the create_course function to insert the course
    await db.query('SELECT create_course($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [
      major_title,
      instructor_ID,
      course_title,
      course_prefix,
      course_number,
      credit,
      semester,
      year,
      method,
      days,
      start_time,
      end_time,
      seats_cap,
      seats_available
    ]);

    res.status(201).send('Course created successfully');
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a course
router.delete('/:course_id', async (req, res) => {
  const { course_id } = req.params;

  if (!course_id) {
    return res.status(400).send('Course ID is required');
  }

  try {
    const deleteQuery = `
      SELECT delete_course($1)
    `;

    await db.query(deleteQuery, [course_id]);
    res.status(200).send('Course deleted successfully');
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
