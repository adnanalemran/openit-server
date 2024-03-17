const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../schemas/userSchemas");

require("dotenv").config();

router.get("/", async (req, res) => {
//   const users = await userCollection.find();
//   res.send(users);
console.log('hello user route ')
res.send('hello user route ');
});


 





router.get("/userNumber", async (req, res) => {
    try {
      const totalStudents = await userCollection.countDocuments({ userType: "isStudent" });
      const totalAdmins = await userCollection.countDocuments({ userType: "isAdmin" });
      const totalUser = await userCollection.countDocuments({ });
    const outService = totalUser-(totalStudents+totalAdmins)  ;
      res.json({totalAdmins:totalAdmins ,totalStudents: totalStudents, totalUser:totalUser,outService:outService});
    } catch (error) {
      console.error("Error counting admins:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
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
  
module.exports = router;
