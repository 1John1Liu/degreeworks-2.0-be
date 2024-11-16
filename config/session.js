const TWO_HOURS = 1000 * 60 * 60 * 2;

module.exports = {
  name: process.env.SESS_NAME || 'sid',
  secret: process.env.SESS_SECRET || 'bruh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: process.env.SESS_LIFETIME || TWO_HOURS,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
