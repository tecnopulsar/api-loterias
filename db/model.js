const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: Number,
  fecha: {
    type: String,
    required: true,
  },
  suerte: {
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
    N06: {
      type: String,
      required: true,
    },
    N07: {
      type: String,
      required: true,
    },
    N08: {
      type: String,
      required: true,
    },
    N09: {
      type: String,
      required: true,
    },
    N10: {
      type: String,
      required: true,
    },
    N11: {
      type: String,
      required: true,
    },
    N12: {
      type: String,
      required: true,
    },
    N13: {
      type: String,
      required: true,
    },
    N14: {
      type: String,
      required: true,
    },
    N15: {
      type: String,
      required: true,
    },
    N16: {
      type: String,
      required: true,
    },
    N17: {
      type: String,
      required: true,
    },
    N18: {
      type: String,
      required: true,
    },
    N19: {
      type: String,
      required: true,
    },
    N20: {
      type: String,
      required: true,
    },
  },
  letras: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quiniela_cdad", schema);
