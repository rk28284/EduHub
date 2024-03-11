const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  

});

const AdminRegModel = mongoose.model("user", adminSchema);

module.exports = {
  AdminRegModel,
};
