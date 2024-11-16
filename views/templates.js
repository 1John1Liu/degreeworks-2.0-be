const templates = {
    welcome: (user) => `
      <h1>Welcome!</h1>
      ${user ? `
        <a href='/dashboard'>Dashboard</a>
        <form method='post' action='/logout'>
          <button>Logout</button>
        </form>` :
        `<a href='/login'>Login</a>`}
    `,
    login: () => `
      <h1>Login</h1>
      <form method='post' action='/login'>
        <input type='email' name='email' placeholder='Email' required />
        <input type='password' name='password' placeholder='Password' required />
        <input type='submit' />
      </form>
    `,
    dashboard: (user) => `
      <h1>Dashboard</h1>
      <ul>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
      </ul>
    `,
  };
  
  module.exports = { templates };
  