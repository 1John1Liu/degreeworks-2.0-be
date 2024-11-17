const express = require('express');
const { redirectDashboard, redirectLogin } = require('../middleware/auth');
const { users } = require('../data/users');
const { templates } = require('../views/templates');

const router = express.Router();

router.get('/', redirectLogin, (req, res) => {

});

router.get('/login', redirectDashboard, (req, res) => {
  res.send(templates.login());
});

router.post('/login', redirectDashboard, (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password); // TODO: hash

  if (user) {
    req.session.userID = user.id;
    return res.redirect('/dashboard');
  }

  res.redirect('/login');
});

router.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) return res.redirect('/dashboard');
    res.clearCookie(process.env.SESS_NAME || 'sid');
    res.redirect('/login');
  });
});

module.exports = router;
