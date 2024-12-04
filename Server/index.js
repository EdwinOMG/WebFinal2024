const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userController = require("./controllers/users");
const workoutsController = require("./controllers/workouts");
const PORT = 3000;

const VITE_JWT_SECRET = process.env.VITE_JWT_SECRET;

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

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, VITE_JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = user;
    next();
  });
};
// Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .get("/about", (req, res, next) => {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)
  .use("/api/v1/workouts", workoutsController)
  /* add other controllers here */
  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
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
