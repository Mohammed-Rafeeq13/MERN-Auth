const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const EmployeeModel = require("./models/Employee");

// creating server and MongoDB connection
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB atlas connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Creating the routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email, password }).then((user) => {
    if (user) {
      if (user.password === password) {
        console.log("Success");
        res.send("Success");
      } else {
        console.log("Password is incorrect");
        res.send("Password is incorrect");
      }
    } else {
      console.log("No Record Exist");
      res.send("No User Found");
    }
  });
});
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => {
      console.log(employee);
      res.send("Registered"); // ✅ Send a response
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error registering user");
    });
});

// creating PORT and running the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server Is Running On ${PORT} Number`);
});
