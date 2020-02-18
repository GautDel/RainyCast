const mongoose = require("mongoose");

const RandCoordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  long: {
    type: String,
    required: true
  }
});


module.exports = RandCoord = mongoose.model("randomCoords", RandCoordSchema);