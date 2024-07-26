// In the first lesson (lesson-one), we will cover the following topics:

// 1- How to create a server with Node.js without frameworks like (Express.js).
// 2- How Node.js handles routes and methods for incoming requests.
// 3- Installing nodemon in (devDependencies) to modify code without restarting the server.
// 4- create (.gitigone) file to avoid pushing not required files to github.

// Import the http module from Node.js to create our server:
const http = require("node:http");
// Define our PORT
const PORT = 8080;

// Use the http.createServer() method to set up our server
// The createServer method should return a function with res.end() to end the response and the Node.js event loop:
const server = http.createServer((req, res) => {
  // All incoming requests are handled in this function
  // Define URL and METHOD here:
  const URL = req.url;
  const METHOD = req.method;

  // Now add all the (if statements) to catch URL && METHOD:

  // Handle GET requests to the root URL "/" (display a form for entering a username)
  if (URL === "/" && METHOD === "GET") {
    console.log(`GET Method on "/" URL`);
    // Send an HTML form to the client with an input field for the username:
    // 1- Set response header to indicate that the response is HTML:
    res.setHeader("Content-Type", "text/html");
    // 2- Use res.write() to send HTML content
    res.write(`
        <form action="/users" method="post">
            <input type="text" name="userName" placeholder="Enter user name:" />
            <input type="submit" />
        </form>
    `);
    return res.end(); // Return means end execution of any code after this (if statement)
  }

  // Handle POST requests to "/users" (process and store the submitted username):
  if (URL === "/users" && METHOD === "POST") {
    // Parse incoming request to extract the userName
    // To capture data received from the form, use the req.on() method:
    // Store data chunks in an empty array called body
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      // Use Buffer.concat() to combine the data chunks and convert them to a string
      // Then use split and take the second array element:
      const userName = Buffer.concat(body).toString().split("=")[1];
      // The extracted userName can be stored in a (users.json) file:
      // Store userName in (users.json) file in (lesson-two) branch
    });

    res.end();
  }

  // Third if statement to get all users when visiting ("/users" with GET method)
  // Third statement in (lesson-two) branch

  return res.end(); // This line is required to end the response if no (if statements) conditions apply.
});

// Use the listen method to listen for incoming requests on our PORT
server.listen(PORT);
