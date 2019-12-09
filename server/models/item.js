const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  imageURL: String,
  prodCode: String,
  model: String
});

// compile schema to model
const Item = mongoose.model("Item", ItemSchema);

module.exports = { Item };
