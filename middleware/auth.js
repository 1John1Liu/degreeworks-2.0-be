const { users } = require('../data/users');

const redirectLogin = (req, res, next) => {
  if (!req.session.userID) return res.redirect('/login');
  next();
};

const redirectDashboard = (req, res, next) => {
  if (req.session.userID) return res.redirect('/dashboard');
  next();
};

const attachUser = (req, res, next) => {
  const { userID } = req.session;
  if (userID) {
    res.locals.user = users.find(user => user.id === userID);
  }
  next();
};

module.exports = { redirectLogin, redirectDashboard, attachUser };
