const mongoose = require("mongoose");

 
const blogCollection = mongoose.model(
  "blogCollection",
  new mongoose.Schema({}, { strict: false })
);

module.exports = blogCollection;
