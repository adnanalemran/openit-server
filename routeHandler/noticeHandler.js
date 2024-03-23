const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const noticeCollection = require("../schemas/noticeSchemas");
require("dotenv").config();

//ok
router.get("/", async (req, res) => {
  const notice = await noticeCollection.find();
  res.send(notice);
});

//ok
router.post("/", async (req, res) => {
  const notice = req.body;
  const create = await noticeCollection.create(notice);
  res.send(create);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await noticeCollection.deleteOne({ _id: id });
  res.send(result);
});

module.exports = router;
