const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URI
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected...');
  } catch (err) {
    console.error("Error----->",err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
