const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Routes for department
const departmentRoutes = require('./routes/department');

// Routes for major
const majorRoutes = require('./routes/major');

// Routes for instructor
const instructorRoutes = require('./routes/instructor');

// Routes for course
const courseRoutes = require('./routes/course');

// Routes for staff
const staffRoutes = require('./routes/staff');

const { attachUser } = require('./middleware/auth');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(attachUser); // Attaches user from session to res.locals

// Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Department Routes
app.use('/department', departmentRoutes);

// Major Routes
app.use('/major', majorRoutes);

// Instructor Routes
app.use('/instructor', instructorRoutes);

// Course Routes
app.use('/course', courseRoutes);

// Staff Routes
app.use('/staff', staffRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
