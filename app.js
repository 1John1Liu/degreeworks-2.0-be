const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const app = express();

// const TWO_HOURS = 1000 * 60 * 60 * 2
const TWO_HOURS = 1000 * 60

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_LIFETIME = TWO_HOURS,
  SESS_NAME = 'sid',
  SESS_SECRET = 'bruh',
} = process.env;

const IN_PROD = NODE_ENV === 'production';

const users = [
  { id: 1, name: 'john', email: 'john@gmail.com', password: 'john' },
  { id: 2, name: 'john2', email: 'john2@gmail.com', password: 'john2' },
]

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))

const redirectLogin = (req, res, next) => {
  if (!req.session.userID){
    req.redirect('/login')
  } else{
    next()
  }
}

const redirectDashboard = (req, res, next) => {
  if (req.session.userID){
    req.redirect('/dashboard')
  } else{
    next()
  }
}

app.use((req, res, next) => {
  const { userID } = req.session
  if(userID) {
    res.locals.user = users.find(
      user => user.id === userID
    )
  }
  next()
})


app.get('/', (req, res) => {
  const { userID } = res.locals;


  res.send(`
    <h1>Welcome!</h1>
    ${userID ? `
      <a href='dashboard'>Dashboard</a>
      <form method='post' action='/logout'>
        <button>Logout</button>
      </form>`
      :
      `
      <a href='/login'>Login</a>
      `
    }
    `)
})

app.get('/dashboard', redirectLogin, (req, res) => {
  const { user } = res.locals
  console.log(req.session)
  res.send(`
    <h1>Dashboard</h1>
    <a href='dashboard'>Main</a>
    <ul>
      <li>name: ${user.name}</li>
      <li>email: ${user.email}</li>
    </ul>
    `)
})

app.get('/login', redirectDashboard, (req, res) => {
  const user = users.find(user => user.id === req.session.userID)
  res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' require />
      <input type='password' name='password' placeholder='Password' require />
      <input type='submit' />
     </form>
    `)


})

app.post('/login', redirectDashboard, (req, res) => {
  const {email, password} = req.body

  if (email && password){
    const user = users.find(
      user => user.email === email && user.password === password // TODO: hash 
    )

    if (user) {
      req.session.userID = user.id
      return res.redirect('/dashboard')
    }
  }

  res.redirect('/login')
})

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard')
    }

    res.clearCookie(SESS_NAME)
    res.redirect('/login')
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
