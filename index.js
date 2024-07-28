// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

function handler(req, res, next) {
  // res.writeHead(200, { "Content-Type": "text/plain" }); // Set the response HTTP header with HTTP status and Content type
  // res.end("Hello World\n"); // Send the response body "Hello World"

  // json version
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      name: "afiani",
      batch: 3,
    })
  );
}
// Create HTTP server
const server = http.createServer(handler);

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
