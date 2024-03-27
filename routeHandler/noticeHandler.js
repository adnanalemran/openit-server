const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const noticeCollection = require("../schemas/noticeSchemas");
require("dotenv").config();

//ok
router.get("/", async (req, res) => {
  try {
    const notices = await noticeCollection.find().sort({ noticeDate: -1 });

    res.send(notices);
  } catch (error) {
    console.error("Error fetching latest notices:", error);
    res.status(500).send("Internal Server Error");
  }
});

//ok
router.post("/", async (req, res) => {
  const notice = req.body;
  const create = await noticeCollection.create(notice);
  res.send(create);
});
//ok
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await noticeCollection.deleteOne({ _id: id });
  res.send(result);
});

router.get("/latest", async (req, res) => {
  try {
    const notices = await noticeCollection
      .find()
      .sort({ noticeDate: -1 })
      .limit(5);
    res.send(notices);
  } catch (error) {
    console.error("Error fetching latest notices:", error);
    res.status(500).send("Internal Server Error");
  }
});

//ok

router.get("/:id", async (req, res) => {
  try {
    const result = await noticeCollection.findOne({
      _id: req.params.id,
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "notice not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
