const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../schemas/userSchemas");

require("dotenv").config();

//ok
router.get("/admin/:email", async (req, res) => {
  const email = req.params.email;
  const user = await userCollection.findOne({ email: email });
 
  let admin = false;
  if (user) {
    admin = user?.userType === "isAdmin";
  }
  res.send({ admin });
});
//ok
router.get("/student/:email", async (req, res) => {
  const email = req.params.email;
  const user = await userCollection.findOne({ email: email });
  let student = false;
  if (user) {
    student = user?.userType === "isStudent";
  }
  res.send({ student: student });
});
//ok

router.get("/:id", async (req, res) => {
  try {
    const result = await userCollection.findOne({
      _id: req.params.id,
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get user by email
router.get("/email/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    const user = await userCollection.findOne({ email: userEmail });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ok
router.get("/", async (req, res) => {
  const users = await userCollection.find();
  res.send(users);
});
//ok
router.post("/", async (req, res) => {
  const user = req.body;
  const create = await userCollection.create(user);
  res.send(create);
});

//ok
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await userCollection.deleteOne({ _id: id });
  res.send(result);
});

//ok
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const userType = req.body.role;

  const filter = { _id: id };
  const update = { $set: { userType } };
  const result = await userCollection.updateOne(filter, update);

  res.send(result);
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
