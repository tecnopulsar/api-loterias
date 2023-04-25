const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://tecnopulsar:BhIrgfhn208YjCdC@cluster0.qdzcu7z.mongodb.net/?retryWrites=true&w=majority');
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connect,
};
