const express = require('express');
const { redirectLogin } = require('../middleware/auth');

const router = express.Router();

router.get('/', redirectLogin, (req, res) => {
  const { user } = res.locals;
  
  // Assuming `user` contains `name` and `role` properties
  const { name, role } = user;

  // Render a form that auto-submits with a POST request
  res.send(`
    <html>
      <body>
        <form id="redirectForm" method="POST" action="http://localhost:3000/dashboard">
          <input type="hidden" name="name" value="${name}" />
          <input type="hidden" name="role" value="${role}" />
        </form>
        <script>
          document.getElementById('redirectForm').submit();
        </script>
      </body>
    </html>
  `);
});

module.exports = router;
