const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongoUrl = process.env.MONGODB;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo Successful");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
