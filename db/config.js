const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connect,
};
