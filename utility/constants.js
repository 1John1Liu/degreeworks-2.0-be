// Array of valid degree types
const DEGREE_TYPES = [
  'Associate of Arts',
  'Associate of Science',
  'Associate of Applied Science',
  'Bachelor of Arts',
  'Bachelor of Science',
  'Bachelor of Fine Arts',
  'Bachelor of Business Administration',
  'Bachelor of Engineering',
  'Bachelor of Architecture',
  'Bachelor of Laws',
  'Master of Arts',
  'Master of Science',
  'Master of Fine Arts',
  'Master of Business Administration',
  'Master of Engineering',
  'Master of Public Health',
  'Master of Social Work',
  'Master of Laws',
  'Master of Education',
  'Doctor of Philosophy',
  'Doctor of Education',
  'Doctor of Business Administration',
  'Doctor of Medicine',
  'Doctor of Dental Surgery',
  'Doctor of Veterinary Medicine',
  'Doctor of Pharmacy',
  'Doctor of Juridical Science',
  'Doctor of Nursing Practice',
  'Juris Doctor',
  'Doctor of Osteopathic Medicine',
  'Doctor of Optometry',
  'Graduate Certificate',
  'Postgraduate Diploma',
  'Professional Certification',
];

// Array of valid course teaching methods
const COURSE_METHODS = [
  'online',
  'hybrid',
  'in-person',
];

const COURSE_DAYS = [
  'MW',
  'TuT',
  'F'
]

const SEMESTERS = [
  'Spring',
  'Fall',
  'Summer',
  'Winter'
]
// Export both arrays
module.exports = {
  DEGREE_TYPES,
  COURSE_METHODS,
  COURSE_DAYS,
  SEMESTERS
};
