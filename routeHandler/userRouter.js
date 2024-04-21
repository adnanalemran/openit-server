const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../schemas/userSchemas");
const noticeCollection = require("../schemas/noticeSchemas");
const blogCollection = require("../schemas/blogSchemas");
require("dotenv").config();

router.get("/", async (req, res) => {
  //   const users = await userCollection.find();
  //   res.send(users);

  res.send("hello user route ");
});

router.get("/userNumber", async (req, res) => {
  try {
    const totalStudents = await userCollection.countDocuments({
      userType: "isStudent",
    });
    const totalAdmins = await userCollection.countDocuments({
      userType: "isAdmin",
    });   
     const applied_student = await userCollection.countDocuments({
      userType: "applied_student",
    });

    const totalUser = await userCollection.countDocuments({});
    const totalNotice = await noticeCollection.countDocuments({});
    const totalBlog = await blogCollection.countDocuments({});

    const outService = totalUser - (totalStudents + totalAdmins);
    res.json({
      totalAdmins: totalAdmins,
      totalStudents: totalStudents,
      totalUser: totalUser,
      outService: outService,
      totalNotice: totalNotice,
      applied_student: applied_student,
      blog: totalBlog,
    });
  } catch (error) {
    console.error("Error counting admins:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/studentAllData", async (req, res) => {
  try {
    const students = await userCollection.find({ userType: "isStudent" });
    res.json(students);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/appliedStudent", async (req, res) => {
  try {
    const students = await userCollection.find({ userType: "applied_student" });
    res.json(students);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ok
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const userType = req.body.role;
  const beach = req.body.beach;

  const filter = { _id: id };

  const update = { $set: { userType, beach } };

  const result = await userCollection.updateOne(filter, update);

  res.send(result);
});

module.exports = router;
