const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Routes for department
const departmentRoutes = require('./routes/department');

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

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
