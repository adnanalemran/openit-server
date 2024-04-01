const mongoose = require("mongoose");

const noticeCollection = mongoose.model(
  "noticeCollection",
  new mongoose.Schema({}, { strict: false })
);

module.exports = noticeCollection;
