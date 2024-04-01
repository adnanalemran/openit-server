const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

const userHandler = require("../routeHandler/userHandler");
const userRouter = require("../routeHandler/userRouter");
const noticeRouter = require("../routeHandler/noticeHandler");
const blogRouter = require("../routeHandler/blogHandler");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://adnan:adnan@cluster0.db2nedm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

-mongoose.connect(uri, { dbName: "open-it" });

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

//start user function

app.use("/user", userHandler);

app.use("/userv2", userRouter);

app.use("/notice", noticeRouter);
app.use("/blog", blogRouter);

// --------------------------------------localApi-------------------------------------------

app.get("/", (req, res) => {
  res.send("Database server is  connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
