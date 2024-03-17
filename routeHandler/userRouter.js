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

      res.json({totalAdmins:totalAdmins ,totalStudents: totalStudents, totalUser:totalUser});
    } catch (error) {
      console.error("Error counting admins:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

module.exports = router;
