const express = require('express');
const router = express.Router();
const {DEGREE_TYPES, COURSE_METHODS, COURSE_DAYS, SEMESTERS} = require('./constants');


const checkMajorTotalHours = (totalHours) => {
  // Ensure totalHours is a number and within the valid range
  totalHours = parseInt(totalHours)
  if (typeof totalHours !== 'number' || isNaN(totalHours)) {
    throw new Error('Invalid input: totalHours must be a number');
  }

  return totalHours >= 0 && totalHours <= 200;
};

const checkStringLength = (str, length) => {
  // Check if the string length is greater than 0 and less than the specified length
  return str.length > 0 && str.length <= length;
};


const checkDegreeTypes = (degreeType) => {
  // Ensure degreeType is a valid string
  if (typeof degreeType !== 'string' || degreeType.trim() === '') {
    throw new Error('Invalid input: degreeType must be a non-empty string');
  }

  // Check if the degreeType exists in the array
  return DEGREE_TYPES.includes(degreeType.trim());
};

const checkEmail = (email) => {
  // Ensure email is a string
  if (typeof email !== 'string' || email.trim() === '') {
    throw new Error('Invalid input: email must be a non-empty string');
  }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test email against the regex
  return emailRegex.test(email.trim());
};

const checkPhoneNumber = (phoneNumber) => {
  // Ensure phoneNumber is a string
  if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
    throw new Error('Invalid input: phoneNumber must be a non-empty string');
  }

  // Regular expression to validate 10-digit phone numbers
  const phoneRegex = /^\d{10}$/;

  // Test phoneNumber against the regex
  return phoneRegex.test(phoneNumber.trim());
};


const checkCourseMethod = (courseMethod) => {
  // Ensure courseMethod is a string
  if (typeof courseMethod !== 'string' || courseMethod.trim() === '') {
    throw new Error('Invalid input: courseMethod must be a non-empty string');
  }

  // Check if the courseMethod exists in the courseTeachingMethods array
  return COURSE_METHODS.includes(courseMethod.trim());
};

const checkCourseDays = (courseDays) => {
  // Ensure courseMethod is a string
  if (typeof courseDays !== 'string' || courseDays.trim() === '') {
    throw new Error('Invalid input: courseDays must be a non-empty string');
  }

  // Check if the courseMethod exists in the courseTeachingMethods array
  return COURSE_DAYS.includes(courseDays.trim());
};

const checkSemesters = (courseSemesters) => {
  // Ensure courseMethod is a string
  if (typeof courseSemesters !== 'string' || courseSemesters.trim() === '') {
    throw new Error('Invalid input: courseSemeters must be a non-empty string');
  }

  // Check if the courseMethod exists in the courseTeachingMethods array
  return SEMESTERS.includes(courseSemesters.trim());
};

const checkCourseCredit = (courseCredit) => {
  if(typeof courseCredit !== 'string' || courseCredit.trim() === ''){
    throw new Error('Invalid input: courseCredit must be a non-empty string');
  }

  return courseCredit >= '1' && courseCredit <= '3';
}

const checkDate = (date) => {
  // Ensure date is a string
  if (typeof date !== 'string' || date.trim() === '') {
    throw new Error('Invalid input: date must be a non-empty string');
  }

  // Regular expression to validate YYYY-MM-DD format
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  // Check if the format is correct
  return dateRegex.test(date.trim())
};

// Route to handle GET requests and check data integrity
router.get('/check', async (req, res) => {
  try {
    // Extract query parameters
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ error: 'Input parameter is required' });
    }

    // Call the utility function with the input
    const result = checkDate(input);

    // Send success response
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error in data-integrity check:', error.message);

    // Send error response
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
