const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const departmentRoutes = require('./routes/department');
const majorRoutes = require('./routes/major');
const dataIntegrityRoutes = require('./utility/data-integrity');

// Routes for instructor
const instructorRoutes = require('./routes/instructor');

const { attachUser } = require('./middleware/auth');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(attachUser); // Attaches user from session to res.locals

// Core Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/department', departmentRoutes);
app.use('/major', majorRoutes);

// Instructor Routes
app.use('/instructor', instructorRoutes);

// Server
// Utility Routes
app.use('/utility/data-integrity', dataIntegrityRoutes);

// Server Configuration
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
