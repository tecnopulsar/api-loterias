const mongoose = require("mongoose");

const schema_loto5plus = mongoose.Schema({
  _id: Number,
  fecha: {
    type: String,
    required: true,
  },
  Loto: {
    N01: {
      type: String,
      required: true,
    },
    N02: {
      type: String,
      required: true,
    },
    N03: {
      type: String,
      required: true,
    },
    N04: {
      type: String,
      required: true,
    },
    N05: {
      type: String,
      required: true,
    },
  },
  Win5: {
    Ganadores: { type: String },
    Premio: { type: String },
  },
  Win4: {
    Ganadores: { type: String },
    Premio: { type: String },
  },
  Win3: {
    Ganadores: { type: String },
    Premio: { type: String },
  },
});

module.exports = mongoose.model("Loto5plus", schema_loto5plus);
