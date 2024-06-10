import express from "express";

const app = express();
app.use(express.json());


const middleware = (req, res, next) => {
  console.log("Middleware called");
  next();
}
// using middleware globally
app.use(middleware);

app.get("/", (req, res) => {
    res.send("Hello World");
    }
);

// using middleware locally
app.get("/users", middleware, (req, res) => {
    res.send("Users");
    }
);