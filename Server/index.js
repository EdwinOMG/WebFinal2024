const express = require("express");
const app = express();
const userController = require("./controllers/users");

const PORT = 3000;

// Middleware
//Cors, write your own headers instead
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // accept any http method from any server
  res.header("Access-Control-Allow-Methods", "*"); // Get, post, put, etc
  res.header("Access-Control-Allow-Headers", "*"); //What kind of headers are allowed, (ALL)
  next(); // has the next functions in the pipeline run
});

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .get("/about", (req, res, next) => {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)
  /* add other controllers here */
  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

console.log("Step #1");
app.listen(PORT, (err, data) => {
  console.log("Step #2");
  console.log("Server is running at http://localhost:" + PORT);
});
console.log("Step #3");

/*  Four types of async methods
    1. Node Style Callbacks
    2. Pipelines
    3. Promises
    4. Async/Await
*/
