const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Students = require("./models/students");

app.use(express.json());

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/student", (req, res) => {
  Students.create(req.body).then((newStudent) => {
    res.send(newStudent);
  });
});

app.use("*", (req, res) => res.sendStatus(404));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
