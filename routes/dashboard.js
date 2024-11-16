const express = require('express');
const { redirectLogin } = require('../middleware/auth');
const { templates } = require('../views/templates');

const router = express.Router();

router.get('/', redirectLogin, (req, res) => {
  const { user } = res.locals;
  res.send(templates.dashboard(user));
});

module.exports = router;
