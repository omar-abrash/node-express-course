// In lesson-02 we will discuss:
// 1- How to work with the 'fs' module from Node.js to store users in a 'users.json' file.
// 2- How to get all users and either render them as HTML or send them as data.

// Import the http module from Node.js to create our server:
const http = require("node:http");
// Import the fs module from Node.js to work with the file system:
const fs = require("node:fs");
// Define our PORT
const PORT = 8080;

// Use the http.createServer() method to set up our server
// The createServer method should return a function with res.end() to end the response and the Node.js event loop:
const server = http.createServer((req, res) => {
  // All incoming requests are handled in this function
  // Define URL and METHOD here:
  const URL = req.url;
  const METHOD = req.method;

  // Handle GET requests to the root URL "/" (display a form for entering a username)
  if (URL === "/" && METHOD === "GET") {
    console.log(`GET request received on "/" URL`);
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
    return res.end(); // End the response for this request
  }

  // Handle POST requests to "/users" (process and store the submitted username):
  if (URL === "/users" && METHOD === "POST") {
    // Parse incoming request to extract the userName
    // To capture data received from the form, use the req.on() method:
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      // Use Buffer.concat() to combine the data chunks and convert them to a string
      // Then use split and take the second array element:
      const userName = Buffer.concat(body).toString().split("=")[1];
      // The extracted userName can be stored in a 'users.json' file:
      // Get the users array from 'users.json', push the new user, and store the new array in 'users.json'
      const users = fs.readFileSync("users.json", "utf-8");
      // Convert JSON format to a JavaScript object:
      const usersArray = JSON.parse(users);
      // Add the new user
      usersArray.push(userName);
      // Convert the JavaScript object back to JSON format:
      const usersArrayJson = JSON.stringify(usersArray);
      // Write the updated users array to 'users.json'
      fs.writeFileSync("users.json", usersArrayJson);
    });

    res.end();
  }

  // Handle GET requests to "/users" to retrieve all users
  if (URL === "/users" && METHOD === "GET") {
    // Read 'users.json' to get all users:
    const users = fs.readFileSync("users.json", "utf-8");
    const usersArray = JSON.parse(users);
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <ul>
        ${usersArray.map((user) => `<li>${user}</li>`).join("")}
        </ul>
    `);

    res.end();
  }

  return res.end(); // This line is required to end the response if no if-statement conditions apply.
});

// Use the listen method to listen for incoming requests on our PORT
server.listen(PORT);

// Go to lesson-03 to use Express Js framework to reducing CODE and focus about business and avoid Boring details
