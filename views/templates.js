const templates = {
    login: () => `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }
            .container {
                display: flex;
                flex-direction: column;
                padding: 20px; /* Adjusted padding */
                gap: 16px;
                width: 552px;
                height: auto; /* Allow the height to adjust dynamically */
                background-color: #ffffff; /* White background for contrast */
            }

            h1 {
              margin: 0;
              font-weight: 100;
              font-size: 34px;
              color: #333;
              
            }

            form {
              display: flex;
              flex-direction: column;
              gap: 16px; /* Space between form elements */
              width: 100%; /* Full width of the container */
            }

            input {
              height: 56px;
              padding: 12px;
              border: 1px solid #f9f9f9;
              background-color: #f9f9f9;
              font-size: 16px; 
              flex: 1;
              
            }

            input:focus {
              outline: none;
              border-color: #007BFF;
              background-color: #fff; /* Subtle focus effect */
            }

            button {
              height: 48px; /* Match the input height */
              border: none;
              border-radius: 5px;
              background-color: #007BFF;
              color: white;
              font-weight: bold;
              font-size: 16px;
              cursor: pointer;
              width: 100%; /* Full width of the container */
            }

            button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
            <div class="container">
                <h1>Sign in</h1>
                <form method="post" action="/login">
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <button type="submit">Sign In</button>
                </form>
            </div>
        </body>
    </html>


  `,
  };
  
  module.exports = { templates };
  